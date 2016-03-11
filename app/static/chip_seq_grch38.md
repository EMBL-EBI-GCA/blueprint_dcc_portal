#ChIP-Seq Analysis Pipeline
***
This document describes the ChIP-Seq analysis performed for the BLUEPRINT project. The experimental protocols are described on the [BLUEPRINT website](http://www.blueprint-epigenome.eu/index.cfm?p=7BF8A4B6-F4FE-861A-2AD57A08D63D0B58).

##Mapping

The mapping was carried out using bwa 0.7.7 to human genome GRCh38 reference. Our reference file can be found in ftp://ftp.ebi.ac.uk/pub/databases/blueprint/reference/20150407\_reference_files

Command line used:

    bwa aln -q 5 grch38.fa input.fastq.gz > intermediate.sai ; bwa samse -r "read group information" grch38.fa intermediate.sai input.fastq.gz | samtools view -bS - > output.bam
    
BAM files are sorted and then duplicates marked using picard:
    
    java -Xmx2048m -jar picard/SortSam.jar INPUT=input.bam OUTPUT=output.bam SORT_ORDER=coordinate VALIDATION_STRINGENCY=SILENT
    
    java -Xmx2048m -jar picard/MarkDuplicates.jar INPUT=input.bam OUTPUT=output.bam METRICS_FILE=output.dup_metrics REMOVE_DUPLICATES=false ASSUME_SORTED=true VALIDATION_STRINGENCY=SILENT


##Filtering

The output bam file was then filtered to remove unmapped reads and reads with Mapping Quality less than 5

Command line used:

    samtools view -b -F 4 -q 5 input.bam > intermediate.output.bam

The intermediate output bam file was then filtered to remove PCR or optical duplicate reads

Command line used:

    samtools view -b -F 1024 intermediate.output.bam > output.bam

##Modelling Fragment Size


The fragment size is modelled using the PhantomPeakQualTools R script:

    run_spp.R -c=output.bam -rf -out=params.out

##Peak Calling

MACS2 (2.0.10.20131216) is used for peak calling with the fragment size predicted by PhantomPeakQualTools. We used both the standard method of running and the -broad flag depending on the mark in question

Command line used:

    macs2 callpeak -t chip.bam -n a_sensible_name --gsize hs -c input.bam --nomodel --shiftsize=half_fragment_size --broad
		
    macs2 callpeak -t chip.bam -n a_sensible_name --gsize hs -c input.bam --nomodel --shiftsize=half_fragment_size

The marks where -broad were used are

 1. H3K27me3
 2. H3K36me3
 3. H3K9me3
 4. H3K4me1

The marks where -broad is omitted are

 1. H3K27ac
 2. H3K4me3
 3. H3K9/14ac
 4. H2A.Zac

##Wiggle plots

Signal plots are produced using align2RawSignal using the fragment size predicted by PhantomPeakQualTools. Sex specific fasta and [umap](http://ftp.ebi.ac.uk/pub/databases/blueprint/reference/mappability/) files are used.

    align2rawsignal -i=chip.bam -of=bg -o=chip.bg -l fragment_size -s=/path/to/fasta_files -u=/path/to/umap_files

##Output format

Bed files, also converted to BigBed. Columns:

 1. chrom
 2. start
 3. end
 4. name
 5. score (fold enrichment * 10, rounded down to integer value)
 6. strand
 7. -log10(qvalue)
 8. -log10(pvalue)
 9. fold_enrichment

##Links

 * [SAMtools](http://samtools.sourceforge.net)
 * [Reference data](ftp://ftp.ebi.ac.uk/pub/databases/blueprint/reference/)
 * [BWA](http://bio-bwa.sourceforge.net/)
 * [Picard](http://picard.sourceforge.net/)
 * [MACS2](https://pypi.python.org/pypi/MACS2)
 * [PhantomPeakQualTools](http://code.google.com/p/phantompeakqualtools/)
