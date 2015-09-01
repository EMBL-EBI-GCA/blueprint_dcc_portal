#RNA-Seq Analysis Pipeline
***
This document describes the RNA-Seq analysis performed by the Guigo group for the BLUEPRINT project. The experimental protocols are described on the [BLUEPRINT website](http://www.blueprint-epigenome.eu/index.cfm?p=7BF8A4B6-F4FE-861A-2AD57A08D63D0B58).

##Overview

The [GRAPE 2](https://github.com/guigolab/grape-nf) pipeline has been used to process the data. The used profile is STAR-RSEM, adapted from the [ENCODE Long RNA-Seq pipeline](https://github.com/ENCODE-DCC/long-rna-seq-pipeline).

The ``prefix`` variable always refers to the Blueprint sample id of the processed file(s).

##Mapping

The mapping step is performed using the [STAR] spliced aligner to map the RNA-seq reads to the references, which can be found in the [Blueprint references FTP](ftp://ftp.ebi.ac.uk/pub/databases/blueprint/reference/20150407_reference_files).


Command line used for the genome and junctions index:

   
```
STAR --runThreadN ${cpus} \
     --runMode genomeGenerate \
     --genomeDir ${genomeDir} \
     --genomeFastaFiles ${genome} \
     --sjdbGTFfile ${annotation} \
     --sjdbOverhang ${sjOverHang}
```

General parameters used: 

General parameters used: 


<div class="table-responsive">
<table class="table table-hover">
  <thead>
    <tr><th>param</th><th>value</th></tr>
  </thead>
  <tbody>
    <tr><td>cpus</td><td>4</td></tr>
    <tr><td>sjOverHang</td><td>100</td></tr>
  </tbody>
  </table>
</div>


Command line used for mapping:

```
STAR --runThreadN ${cpus} \
     --genomeDir ${genomeDir} \
     --readFilesIn ${reads} \
     --outSAMunmapped Within \
     --outFilterType BySJout \
     --outSAMattributes NH HI AS NM MD \
     --outFilterMultimapNmax ${maxMultimaps} \
     --outFilterMismatchNmax 999 \
     --outFilterMismatchNoverReadLmax 0.0${maxMismatches} \
     --alignIntronMin 20 \
     --alignIntronMax 1000000 \
     --alignMatesGapMax 1000000 \
     --alignSJoverhangMin 8 \
     --alignSJDBoverhangMin 1 \
     --readFilesCommand pigz -p${cpus} -dc \
     --outSAMtype BAM SortedByCoordinate \
     --quantMode TranscriptomeSAM \
     --outSAMattrRGline ${readGroup} \
     --limitBAMsortRAM ${totalMemory}
```

General parameters used: 


<div class="table-responsive">
<table class="table table-hover">
  <thead>
    <tr><th>param</th><th>value</th></tr>
  </thead>
  <tbody>
    <tr><td>cpus</td><td>8</td></tr>
    <tr><td>maxMultimaps</td><td>10</td></tr>
    <tr><td>maxMismatches</td><td>4</td></tr>
  </tbody>
  </table>
</div>


###Output

```
${prefix}.bam
${prefix}.toTranscriptome.bam
```


File format:

[SAM format](http://samtools.sourceforge.net/SAM1.pdf)


##Signal

In this step the [STAR](https://github.com/alexdobin/STAR/) spliced aligner is used to produce signal files. Multiple signal files are produced: 

1. using only Unique mappings 
2. using Unique+Multi mappings 

The procedure is differentiated for strand-specific and non-strand-specific samples. For strand-specific data the signal from the two strands is separated. For non-strand-specific data the signal from the two strands is collapsed. 

The ``bedGraphToBigWig`` tool is used to convert the BedGraph outputs from [STAR](https://github.com/alexdobin/STAR/) to [BigWig format](https://genome.ucsc.edu/FAQ/FAQformat.html#format6.1). 

Command line used for [STAR](https://github.com/alexdobin/STAR/):

```
STAR --runThreadN ${cpus} \
     --runMode inputAlignmentsFromBAM \
     --inputBAMfile ${bam} \
     --outWigType bedGraph \
     --outWigStrand ${dataType}
     --outFileNamePrefix ./Signal/ \
     --outWigReferencesPrefix ${wigRefPrefix}
```

General parameters used: 

<div class="table-responsive">
<table class="table table-hover">
  <thead>
    <tr><th>param</th><th>value</th></tr>
  </thead>
  <tbody>
    <tr><td>cpus</td><td>8</td></tr>
    <tr><td>dataType</td><td>Stranded or Unstranded</td></tr>
    <tr><td>wigRefPrefix</td><td>chr</td></tr>
  </tbody>
  </table>
</div>


Command line used for ``bedGraphToBigWig``:

```
bedGraphToBigWig ${signalFile}\
                 <(grep '^${wigRefPrefix}' ${genomeFai}) \
                 ${biwigOutput} 
```

Output files ([BigWig format](https://genome.ucsc.edu/FAQ/FAQformat.html#format6.1)):

```
### stranded
${prefix}.Unique.plusRaw.bw
${prefix}.Unique.minusRaw.bw
${prefix}.UniqueMultiple.plusRaw.bw
${prefix}.UniqueMultiple.minusRaw.bw

### unstranded
${prefix}.Unique.raw.bw
${prefix}.UniqueMultiple.raw.bw
```

### Contigs

In this step [BEDtools](http://bedtools.readthedocs.org/en/latest) and the [contigsNew Python script](https://github.com/guigolab/grape-nf/blob/develop/bin/contigsNew.py) are used to produce a BED file with the contig information. 

Only unique mappings are used in this step.

```
bamtools filter -tag NH:1 -in ${inputBam} -out ${uniqBam}
```

The procedure is differentiated for strand-specific and non-strand-specific samples. For strand-specific data the directionality of the antisense mate/read is changed modifying the SAM flag field. Also, the signal files are seprated by strand.

Command line used for strand-specific samples:

```
genomeCoverageBed -strand + -split -bg -ibam ${uniqBam} > ${prefix}.plusRaw.bedgraph
genomeCoverageBed -strand - -split -bg -ibam ${uniqBam} > ${prefix}.minusRaw.bedgraph
contigsNew.py --chrFile ${genomeFai} \
              --fileP ${prefix}.plusRaw.bedgraph \
              --fileM ${prefix}.minusRaw.bedgraph \
              --sortOut \
              > ${prefix}.bed
```

Command line used for non-strand-specific samples:

```
bamToBed -i ${uniqBam} | sort -T. -k1,1 -k2,2n | mergeBed > ${prefix}.bed
```

Output files ([BED format](https://genome.ucsc.edu/FAQ/FAQformat.html#format1)):

```
${prefix}.bed
```


##Quantification

In this step [RSEM](http://deweylab.biostat.wisc.edu/rsem/) is used to provide transcript and gene quantifications. A [specific SAMtools version](https://github.com/emi80/samtools/tree/1.2-rglab-CRG) is used to systematically sort the reads as required by [RSEM](http://deweylab.biostat.wisc.edu/rsem/) .

Command line used for the transcriptome index:

```
rsem-prepare-reference --gtf ${annotation} \
                       ${genome} \
                       txDir/RSEMref
```

Command line used for the quantification:

```
samtools sort -@ ${cpus} -ni -O bam -T . -o tmp\_query_sorted.bam ${bam}

rsem-calculate-expression --bam \
                          --estimate-rspd  \
                          --calc-ci \
                          --no-bam-output \
                          --seed 12345 \
                          -p ${cpus} \
                          --ci-memory ${memory} \
                          --paired-end \
                          --forward-prob ${forwardProb} \
                          tmp_query_sorted.bam \
                          ${quantRef}/RSEMref \
                          ${prefix}
```

General parameters used: 

<div class="table-responsive">
<table class="table table-hover">
  <thead>
    <tr><th>param</th><th>value</th></tr>
  </thead>
  <tbody>
    <tr><td>cpus</td><td>8</td></tr>
    <tr><td>forwardProb</td><td>1 or 0 depending on the read orientation</td></tr>
  </tbody>
  </table>
</div>



The ``--forward-prob ${forwardProb}`` option is not needed for non-strand-specific samples (the default of 0.5 is used) and is then removed. Also, the ``--paired-end`` command flag is removed for single end data.

Output files ([RSEM output format](http://deweylab.biostat.wisc.edu/rsem/rsem-calculate-expression.html#output)):

```
${prefix}.genes.results
${prefix}.isoforms.results
```


##Links

- [ENCODE Long RNA-Seq pipeline](https://github.com/ENCODE-DCC/long-rna-seq-pipeline)
- [CRG](http://www.crg.eu)
- [Blueprint references FTP](ftp://ftp.ebi.ac.uk/pub/databases/blueprint/reference/20150407_reference_files)
- [GRAPE 2](https://github.com/guigolab/grape-nf)
- [STAR](https://github.com/alexdobin/STAR)
- [SAM format](http://samtools.sourceforge.net/SAM1.pdf)
- [BigWig format](https://genome.ucsc.edu/FAQ/FAQformat.html#format6.1)
- [BEDtools](http://bedtools.readthedocs.org/en/latest)
- [contigsNew Python script](https://github.com/guigolab/grape-nf/blob/develop/bin/contigsNew.py)
- [BED format](https://genome.ucsc.edu/FAQ/FAQformat.html#format1)
- [specific SAMtools version](https://github.com/emi80/samtools/tree/1.2-rglab-CRG)
- [RSEM](http://deweylab.biostat.wisc.edu/rsem)
- [RSEM output format](http://deweylab.biostat.wisc.edu/rsem/rsem-calculate-expression.html#output)
