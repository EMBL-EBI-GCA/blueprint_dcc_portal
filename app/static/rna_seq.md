#RNA-Seq Analysis Pipeline
***
This document describes the RNA-Seq analysis performed by the Guigo group for the BLUEPRINT project. The experimental protocols are described on the [BLUEPRINT website](http://www.blueprint-epigenome.eu/index.cfm?p=7BF8A4B6-F4FE-861A-2AD57A08D63D0B58).

##Overview

The pipeline script executes several steps on the input sample. The steps are described in details below.

Command line:

    ### BLUEPRINT RNAseq pipeline ###
    Run the RNAseq pipeline on one sample.

    Usage: ./blueprint.pipeline.sh -i FASTQ_FILE -g GENOME_FILE -a ANNOTATION_FILE [OPTION]...

      -i|--input        input file.
      -g|--genome       reference genome file.
      -a|--annotation   reference gene annotation file.

    Options:
      -m|--mismatches   Max number of mismatches. Default "4".
      -n|--hits     Max number of hits. Default "10".
      -q|--quality-offset   The quality offset of the fastq files. Default: "33".
      -r|--max-read-length  The maximum read length (used to compute the transcriptomes). Default: "150".
      -s|--read-strand  directionality of the reads (MATE1_SENSE, MATE2_SENSE, NONE). Default "NONE".
      -l|--loglevel     Log level (error, warn, info, debug). Default "info".
      -t|--threads      Number of threads. Default "1".
      -p|--paired-end   Specify whether the data is paired-end. Defalut: "false".
      -c|--count-elements   A comma separated list of elements to be counted by the Flux Capacitor.
                Possible values: INTRONS,SPLICE_JUNCTIONS. Defalut: "none".
      -h|--help     Show this message and exit.
      --bam-stats       Run the RSeQC stats on the bam file. Default "false".
      --flux-mem        Specify the amount of ram the Flux Capacitor can use. Default: "3G".
      --tmp-dir     Specify local temporary folder to copy files when running on shared file systems.
                Default: "$TMPDIR" if the environment variable is defined, "-" otherwise.
      --dry-run     Test the pipeline. Writes the command to the standard output.

##Pipeline programs


The program versions currently used within the pipeline:

<table class="table table-striped">
  <thead>
    <tr><th>Tool</th><th>Step</th><th>Version</th></tr>
  </thead>
  <tbody>
    <tr><td>GEMTools</td><td>mapping </td><td>1.6.2</td></tr>
    <tr><td>Flux Capacitor</td><td>isoform quantification</td><td>1.2.4</td></tr>
    <tr><td>SAMtools</td><td>SAM/BAM manipulation</td><td>0.1.19</td></tr>
    <tr><td>RSeQC </td><td>BAM statistics</td><td>2.3.7 </td></tr>
  </tbody>
</table>

The other programs described below are CRG in-house tools or tools adapted from external programs. Those tools have no version information.

##Mapping

The mapping step is performed by mean of the [GEMTools library](http://github.com/gemtools) which uses the GEM mapper
to map the RNA-seq reads to the reference genome and transcriptome. The transcriptome is artificially computed from
the Gencode version 15 annotation and the denovo junctions predicted from  the input reads. We use male and female
genome and annotation.

Command line:

    gemtools --loglevel LOGLEVEL rna-pipeline -f FASTQ_FILE -q QUALITY_OFFSET -i INDEX_FILE -a ANNOTATION_FILE -o OUTPUT_DIR -t THREADS --no-bam

The parameters used for the mapping steps are the following:

<table class="table table-striped">
<thead>
  <tr><th>Parameter</th><th>Value</th></tr>  
</thead>
<tbody>
    <tr><td>quality offset:</td><td>33</td></tr>  
    <tr><td>mismatches:</td><td>0.06</td></tr> 
    <tr><td>denovo junction coverage:</td><td>2</td></tr> 
    <tr><td>strata after best:</td><td>1</td></tr> 
    <tr><td>max edit distance:</td><td>0.20</td></tr> 
</tbody>
</table>

###Output

    Produced file: SAMPLE.map.gz

File format:

GEM format - see [GEM Alignment Format](http://algorithms.cnag.cat/wiki/FAQ:The_GEM_alignment_format)

##Filtering

In the filtering step some filter are applied to the mapping file:

1.	a filter by the quality of the mappings, including all the following classes of alignments:

	- Matches which are unique, and do not have any subdominant match: 251 <= MAPQ <= 254, XT=U
	- Matches which	are unique, and have subdominant matches but a different score: 175 <= MAPQ <= 181, XT=U
	- Matches which are putatively unique (not unique, but distinguishable by score): 119 <= MAPQ <= 127, XT=U
	- Matches which are a perfect tie: 78 <= MAPQ <= 90, XT=R.

2.	a filter on the levenshtein error (edit distance). We request a max error of 4, that is a maximum of 4 edit operations allowed (including mismatches, insertions and deletions). This is done in order to get a better mapping set for the downstream analysis since we realized that the mapping parameters were a bit too permissive.

3. a filter on the number of multiple mappings allowed. At maximum 9 multiple mappings are allowed for the same sequence.

Command line:

    gt.quality -i SAMPLE.map.gz -t THREADS | gt.filter --max-levenshtein-error 4 -t THREADS | gt.filter --max-matches 10 -t THREADS | pigz -p THREADS -c  SAMPLE.map.gz


###Output

    Produced file: SAMPLE_m4_n10.map.gz

File format:

GEM format - see [GEM Alignment Format](http://algorithms.cnag.cat/wiki/FAQ:The_GEM_alignment_format)

##Converting to BAM

In this step the GEM file obtained from the mapping step is converted to a sorted BAM file. The file is
sorted by genomic coordinates. The XS field required by Cufflinks (please see [Cufflinks Documentation][]) is added during the conversion.

Command line:

    pigz -p THREADS -dc SAMPLE_m4_n10.map.gz | gem2sam -T THREADS/2 -I INDEX_FILE --expect-paired-end-reads -q offset-33 -l | samtools view -@ THREADS -Sb | - samtools sort -@ THREADS -m MAX_MEM - SAMPLE_m4_n10


###Output

    Produced file: SAMPLE_m4_n10.bam

File format:

SAM format - see [SAM Format Specification](http://samtools.github.io/SAM1.pdf)

##Indexing

The filterd BAM files is then indexed.

Command line:

    $ samtools index SAMPLE_m4_n10.bam


###Output

      Produced file: SAMPLE_m4_n10.bam.bai


##Producing BigWig

In this step the procedure is differentiated for stranded and unstranded sample. For each sample:

- two BigWig files are produced for strand-specific data
or
- one file for unstranded data.

To get the correct signal for strand specific data one additional step is required to change the directionality of the antisense mate. The command line of this step:

    # reverse the antisense mate
    samtools view -h SAMPLE_m4_10.bam | awk -v MateBit=64 'BEGIN {OFS=\"\t\"} {if (\$1!~/^@/ && and(\$2,MateBit)>0) {\$2=xor(\$2,0x10)}; print}' | samtools view -Sb - > TEMP_BAM_MATE1_REVERSED.bam

Command line for stranded data:

    # generate bedgraph file
    genomeCoverageBed -strand STRAND -split -bg -ibam TEMP_BAM_MATE1_REVERSED.bam SAMPLE.STRAND.bedgraph

    # produce a bigwig file for each strand
    bedGraphToBigWig SAMPLE.STRAND.bedgraph GENOME_FASTA_INDEX SAMPLE.STRANDRaw.bigwig

Command line for unstranded samples:

    # generate bedgraph file
    genomeCoverageBed -split -bg -ibam SAMPLE_m4_10.bam SAMPLE.bedgraph

    # produce a single bigwig file
    bedGraphToBigWig SAMPLE.bedgraph GENOME_FASTA_INDEX SAMPLE.STRANDRaw.bigwig


###Output

    Produced files: SAMPLE.plusRaw.bigwig  # if the sample is stranded
                    SAMPLE.minusRaw.bigwig # if the sample is stranded
                    SAMPLE.bigwig          # if the sample is unstranded


##Producing Contigs

Also in this step the procedure is differentiated for stranded and unstranded sample. For strand specific data it is required to change the directionality of the antisense mate. The command line of this step:

    # reverse the antisense mate
    samtools view -h -@ THREADS SAMPLE_m4_10.bam | awk -v MateBit=64 'BEGIN {OFS=\"\t\"} {if (\$1!~/^@/ && and(\$2,MateBit)>0) {\$2=xor(\$2,0x10)}; print}' | samtools view -@ THREADS -Sb - > TEMP_BAM_MATE1_REVERSED.bam

The computation is performed on unique mappings.

Command line for stranded data:

    # generate a bam file with unique mappings
    bamFlag -in TEMP_BAM_MATE1_REVERSED.bam -out TEMP_BAM_UNIQUE.bam -m 3

    # generate the bedgraph file
    genomeCoverageBed -strand STRAND -split -bg -ibam TEMP_BAM_UNIQUE.bam SAMPLE.STRAND.bedgraph

    # produce contigs
    makecontig --chrFile GENOME_FASTA_INDEX --fileP SAMPLE.PLUSSTRAND.bedgraph --fileM SAMPLE.MINUSSTRAND.bedgraph | awk '{s=\"\"; for(i=1; i<=NF; i++){s=(s)(\$i)(\"\t\")} print s}' > SAMPLE_contigs.bed

Command line for unstranded samples:

    # generate a bam file with unique mappings
    bamFlag -in SAMPLE_m4_10.bam -out TEMP_BAM_UNIQUE.bam -m 3

    # produce contigs
    bamToBed -i TEMP_BAM_UNIQUE.bam | sort -k1,1 -nk2,2 > | mergeBed > SAMPLE_contigs.bed


###Output

    Produced files: SAMPLE_contigs.bed


##Quantifying

In the quantification step the [Flux Capacitor](http://sammeth.net/confluence/display/FLUX/Home) is used to provide transcript quantifications and annotated splice junction counts. One output file
is given at the end of the run. It is then splitted into the different files corrensponding to the two quantified features.

Command line:

    # sort the ANNOTATION
    flux-capacitor -t sortGTF -c -i ANNOTATION_FILE -o ANNOTATION_FILE_SORTED > ANNOTATION_SORT_LOG 2>&1

    # launch the Flux Capacitor
    flux-capacitor -p PARAM_FILE -i SAMPLE_m4_10.bam -a ANNOTATION_FILE_SORTED -o SAMPLE.gtf > FLUX_LOG 2>&1

    # get only the transcript quantifications
    awk '$3=="transcript"' SAMPLE.gtf > SAMPLE_transcript.gtf

    # get only the splice junction quantifications
    awk '$3=="junction"' SAMPLE.gtf > SAMPLE_junction.gtf # if COUNT_ELEMENTS contains SPLICE_JUNCTIONS

    # get only the all-intronic region quantifications
    awk '$3=="intron"' SAMPLE.gtf > SAMPLE_intron.gtf     # if COUNT_ELEMENTS contains INTRONS

    # get exon quantifiactions
    trToEx ANNOTATION_FILE SAMPLE.gtf

    # get gene quantifications
    trToGn ANNOTATION_FILE SAMPLE.gtf

In all the runs we performed @CRG the parameter file contains the following options for all samples:

    ANNOTATION_MAPPING AUTO
    COUNT_ELEMENTS [SPLICE_JUNCTIONS, INTRONS]

Some options need changed/added for stranded samples:

    ANNOTATION_MAPPING PAIRED_STRANDED
    READ_STRAND MATE2_SENSE


###Output

    Produced files: SAMPLE.gtf
                    SAMPLE_transcript.gtf
                    SAMPLE_junction.gtf # if COUNT_ELEMENTS contains SPLICE_JUNCTIONS
                    SAMPLE_intron.gtf   # if COUNT_ELEMENTS contains INTRONS
                    SAMPLE_distinct_exon_with_rpkm.gff
                    SAMPLE_gene_with_rpkm.gff



##Links

 - [SAM Format Specification](http://samtools.sourceforge.net/SAM1.pdf  "SAM Format Specification")
 - [GEM Alignment Format](http://algorithms.cnag.cat/wiki/FAQ:The_GEM_alignment_format  "GEM Alignment Format")
 - [Cufflinks Documentation](http://cufflinks.cbcb.umd.edu/manual.html#cufflinks_input  "Cufflinks Input")
 - [Flux Capacitor](http://sammeth.net/confluence/display/FLUX/Home  "Flux Capacitor Wiki")