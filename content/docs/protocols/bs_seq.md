---
title: Whole Genome Bisulphite Sequencing Pipeline
---

This describes the WGBS-Seq analysis performed for the Blueprint project

#Mapping

The mapping was carried out using GEM 1.242 to a converted reference
sequence: Homo_sapiens.GRCh37.vir_BS.chromosomes.fa, which can be
found in ftp.ebi.ac.uk/pub/databases/blueprint/reference/

The reference file contains two copies of the hsapiens GRCh37
reference, one with all C's changes to T's and one with all G's
changed to A's. The contig names for the two references have been
modified so that chrXX becomes chrXX#C2T or chrXX#G2A.  In addition
the file also contains two copies of the NCBI viral genome dataset
(rel 53, http://www.ncbi.nlm.nih.gov/genomes/GenomesHome.cgi?taxid=10239),
modified in the same way as for the human genome.  For the viral
contigs the names have been shortened to the accession# only.

Before mapping, the original sequence in the input FASTQ was stored
(by appending to the sequence ID line).  The sequence data was then
modified so that any C's in the first read of a pair were converted to
T's, and any G's on the second read of a pair were converted to A's.
The mapping was then performed, and the original sequence was
replaced in the output mapping.

Command line used: 

    gem-mapper -I Homo_sapiens.GRCh37.vir_BS.chromosomes.fa -i input.fastq -o output.map -q offset_33 -T 8 -m 5 -d 1

#Read Filtering

Read pairs were selected where a single paired mapping existed with
the correct read pair orientation and with a fragment size within the
central 95% of the read size distribution.

Command line used:

    sel_reads -z -i insert_size.txt.gz -r read1.map,read2.map --output uniq_1.map

#Read normalization & sorting

The program normalize was used to combine the paired selected map
files to give a combined output file with 1 line per read pair, the
first five bases of each read set to 'N', all reads in the forward
orientation, overlapping reads merged into a single reads, and reads
within a pair ordered into genomic order.  The output from normalize
is then sorted in genomic order using the unix sort command.

Command line used:

normalize -L5 -r uniq_1.map.gz,uniq_2.map.gz | sort -S2g -k2,2-k5,5n
-k6,6n -k4,4 -k3,3 > sorted.txt

#Methylation and genotype calling

Calling of methylation levels and genotypes was performed by the
program bscall using the default settings.

Command line used:

    bs_call -o bs_call sorted.txt

#Filtering

Filtering of homozygous CpG sites and homozygous cytosines was
performed on the output of bs_call using the program c_filter, using a
maximum coverage cutoff of 250 reads per position.

Command line used:

    c_filter -o filtered -c 250 -a bs_call_output.txt

To generate two files per sample; one with all sites called as
homozygous CC or GG with a probability of genotyping error <=0.01, and
the other with the subset of dinucleotides called as CC/GG.


#File formats

##'all' file

Columns:

 1. Chromosome.
 2. Position (offset 1).
 3. Strand ('+' or '-').
 4. Phred scaled probability of genotype *not* being CC (max = 255)
 5. Local context - the three bases from the current position in the direction given by the strand column.  If a neighbouring base are not called or were filtered, there will be an N at the corresponding position, whereas if the base was called as a heterozygote then the IUPAC code will be used. 
 6. CpG status: (0 = unknown as next base is 'N'; 1 = not in CpG; 2 = in CpG; 3 = in heterozygous CpG).
 7. Maximum likelihood estimate of methylation prob. ('-' means no informative reads for methylation).
 8. Standard deviation of methylation prob. ('-' means as above).
 9. No. of non-converted C reads
 10. No. of converted C reads
 11. Total reads supporting CC call
 12. Total reads

##'cpg' file

Columns:

 1. Chromosome
 2. Position of CC (offset 1)
 3. Phred scaled probability of genotype *not* being CC/GG
 4. Methylation probability (combined estimate from the weighted average of the MLEs at the two positions)
 5. Standard deviation of methylation probability (from weighted average)
 6. No. of non-converted C reads (sum of counts at both positions)
 7. No. of converted C reads (idem)
 8. Total reads supporting genotype call (idem)
 9. Total reads (idem)

##Hyper/Hypo methylated regions

Hypomethylated regions have an average methylation of <0.25 and all
CpGs in the regions have methylation <0.5.

Hypermethylated regions have an average methylation of >0.75 and all
CpGs in the regions have methylation >0.5.

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

gencode annotation:

Comma separated list of annotations.  Each annotation is either '.'
(no annotation) or has the following semicolon separated fields:

 * transcript_id
 * transcript_name
 * transcript_type
 * transcript_status
 * gene_id
 * gene_name
 * gene_type
 * gene_status
 * strand
 * annotation_type
 * coding/non_coding flag

gencode annotation:

Comma separated list of annotations.  Each annotation is either '.'
(no annotation) or has the form: Accession;Name;Strand;Type
