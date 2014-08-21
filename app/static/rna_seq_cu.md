#RNA-Seq Analysis Pipeline (UCAM)
***
This document describes the RNA-Seq analysis performed by the Ouwehand group for the BLUEPRINT project. The experimental protocols are described on the [BLUEPRINT website](http://www.blueprint-epigenome.eu/index.cfm?p=7BF8A4B6-F4FE-861A-2AD57A08D63D0B58).


##RNA-seq adapter trimming

Paired-end reads were trimmed for both PCR and sequencing adapters using Trim Galore! v0.2.8.

First cycle of trimming: we used parameter -e 0.05 and retained reads of length equal to or larger than 36 bp.

    adapter1="GATCGGAAGAGCGGTTCAGCAGGAATGCCGAGACCG"
    adapter2="AGATCGGAAGAGCGTCGTGTAGGGAAAGAGTGTAGAT"

    trim_galore --fastqc --fastqc_args " --outdir $fastqcDir -t $np " -q 15 -a $adapter1 -a2 $adapter2 --stringency 3 -e 0.05 --length 36 --trim1 --gzip -o $outDir

Second cycle of trimming: parameter -e was set to its default value (0.1) in order for poly-(A)+ tails to be successfully trimmed. Finally, we kept reads with a length equal to or larger than 20 bp. Unpaired reads were discarded during both trimming cycles.

    adapter1="AAGCAGTGGTATCAACGCAGAGT"
    adapter2="AAGCAGTGGTATCAACGCAGAGT"
    
    trim_galore --fastqc --fastqc_args " --outdir $fastqcDir -t $np " -q 15 -a $adapter1 -a2 $adapter2 --stringency 3

##Transcriptome alignment and quantification of expression

Trimmed reads were aligned to the Ensembl v70 human transcriptome using Bowtie v0.12.8.

    bowtie -a --best --strata -S -m 100 -X 400 --chunkmbs 400 -p 8 Homo_sapiens.GRCh37.70 -1 <(gzip -dc asample_1.fq.gz) -2 <(gzip -dc asample_2.fq.gz) | samtools view -F 0xC -bS - | samtools sort -n -asample.namesorted


We then used the MMSEQ v1.0.5 tool to quantify gene and transcript isoform expression. Quantification of expression was performed in two steps:
    
    # Map reads to transcript sets

    bam2hits Homo_sapiens.GRCh37.70.fa asample.namesorted.bam
    
    # Obtain expression estimates mmseq asample.hits asample

    mmseq asample.hits asample
    
##Links

 * [Trim Galore!](http://www.bioinformatics.babraham.ac.uk/projects/trim_galore/)
 * [bowtie](http://bowtie-bio.sourceforge.net/index.shtml) 
 * [MMSEQ](https://github.com/eturro/mmseq)
 