#Whole Genome Bisulphite Sequencing Pipeline
***
This document describes the WGBS-Seq analysis performed for the BLUEPRINT project. The experimental protocols are described on the [BLUEPRINT website](http://www.blueprint-epigenome.eu/index.cfm?p=7BF8A4B6-F4FE-861A-2AD57A08D63D0B58).

##Mapping

The mapping was carried out using GEM 3.0 to a converted reference
sequence: GCA\_000001405.15\_GRCh38\_no\_alt\_analysis\_set.fna, which can be found at
the [ftp site](ftp://ftp.ncbi.nlm.nih.gov/genbank/genomes/Eukaryotes/vertebrates_mammals/Homo_sapiens/GRCh38/seqs_for_alignment_pipelines/GCA_000001405.15_GRCh38_no_alt_analysis_set.fna.gz)

The reference file contains two copies of the hsapiens GRCh38
reference, one with all C's changes to T's and one with all G's
changed to A's. In addition the file also contains two copies of the
NCBI viral genome dataset
([rel 69](http://www.ncbi.nlm.nih.gov/genomes/GenomesHome.cgi?taxid=10239)),
modified in the same way as for the human genome.  For the viral
contigs the names have been shortened to the accession# only. Before
mapping, the original sequence in the input FASTQ was stored (by
appending to the sequence ID line).  The sequence data was then
modified so that any C's in the first read of a pair were converted to
T's, and any G's on the second read of a pair were converted to A's.
The mapping was then performed, and the original sequence was replaced
in the output mapping.

Command line used: 

    gem3-mapper -p --bisulfite-mode -I GCA_000001405.15_GRCh38_no_alt_analysis_set_BS.gem -s 1 -p -M 4

The SAM output produced by the gem3 mapper contains a custom tag, XB,
that denotes the version of the reference to which the read is mapped
(either CT or GA).  Read pairs were selected using the default
read-pairing algorithm in gem3, and where the assigned MAPQ score for
the read pair was >=20.

##Methylation and genotype calling

Calling of methylation levels and genotypes was performed by the
program bs_call version 2.0 in paired end mode and trimming the first and
last 5 bases from each read pair by using the following command line:


Command line used:

    bs_call -r GCA_000001405.15_GRCh38_no_alt_analysis_set_vir.fna.gz -p -L5


##Filtering

Filtering of CpG sites and homozygous cytosines was
performed on the VCF output of bs\_call using the program filter_vcf
with default parameters.

Command line used:

    vcf_filter sample.vcf

This generate one file per sample with all observed sites where the reference
or the called genotype indicates the possible presence of a C followed
by a G.  No other filtering is performed.


VCF Columns:

1. Chromosome
2. Position of first base in dinucleotide (C) (offset 1)
3. Reference bases at the two positions
4. Called genotypes at the two positions (iupac codes used for heterozygous calls)
5. Phred scaled probability of genotype *not* being as in col 4
6. Methylation probability (combined estimate from the weighted average of the MLEs at the two positions)
7. Standard deviation of methylation probability (from weighted average)
8. No. of non-converted C reads (sum of counts at both positions)
9. No. of converted C reads (idem)
10. Total reads supporting genotype call (idem)
11. Total reads (idem)
12. 8 comma separated numbers with allele counts: (A,C,G,T) not
      informative for methylation and (A,C,G,T) informative for methylation
      from forward strand
13. idem from reverse strand


##BigWig files

Wig files were produced from the CpG files above by filtering on
sites with homozgous CG genotype call (col 4) and phred score >=20.
One file with the methylation estimate and another with the standard
error of the methylation estimate were produced per sample using the
perl script mk_wig.pl.  wigToBigWig was then used to convert the wig
files to BigWig format.

##Hyper/Hypo methylated regions

Hypomethylated regions have an average methylation of <0.25 and all
CpGs in the regions have methylation <0.5.

Hypermethylated regions have an average methylation of >0.75 and all
CpGs in the regions have methylation >0.5.

CpG sites have been filtered to have a maximum total read count of 500.

Columns:

1. Chromosome
2. Region start position
3. Region end position
4. Size of region in base pairs
5. Average methylation level in region
6. Number of CpGs in region
7. Median number of non-converted reads at CpGs in region
8. Median number of converted reads at CpGs in region
9. Median number of total reads at CpGs in region
10. Island/Shelf/Shore (union of CpG Island annotations for all CpGs in region)
11. refGene annotation (union of refGene  annotations for all CpGs in region)


Annotations:

Single '.' means no annotation available


Gencode annotation:

Comma separated list of annotations.  Each annotation is either '.'
(no annotation) or has the following semicolon separated fields:

* transcript\_id
* transcript\_name
* transcript\_type
* transcript\_status
* gene\_id
* gene\_name
* gene\_type
* gene\_status
* strand
* annotation\_type
* coding/non\_coding flag


