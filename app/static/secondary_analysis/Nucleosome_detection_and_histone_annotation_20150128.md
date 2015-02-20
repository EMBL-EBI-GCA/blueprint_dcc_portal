# Nucleosome detection and histone mark annotation
***

## Analysis description

The purpose of this analysis is to detect well-positioned nucleosomes from histone modification data and to annotate each putative nucleosome with the histone marks that are active on it.

## Analysis README
For more details, see [README](http://ftp.ebi.ac.uk/pub/databases/blueprint/releases/20150128/homo_sapiens/secondary_analysis/Nucleosome_detection_and_histone_annotation/README_Nucleosome_detection_and_histone_mark_annotation_20150128)

## Data files
[FTP](http://ftp.ebi.ac.uk/pub/databases/blueprint/releases/20150128/homo_sapiens/secondary_analysis/Nucleosome_detection_and_histone_annotation/)

## Data format

The input of the algorithm are .bam files for histone modifications and optionally for a control experiment.

The output of the algorithms are two files: (I) a bed file and (II) a tsv file.

### bed file

The first line is a track definition line for the genome browser. All the other lines have the following format (fields are tab separated):

1. chromosome
2. start
3. end
4. nucleosome_name
5. z-score

The z-score is a confidence score about the nucleosome prediction.

### tsv file

The first line starts with # and contains a label for each field which should suggest its meaning (fields are tab separated).

All the other lines have the following fields (fields are tab separated):

1. nucleosome_name
2. chromosome
3. central position of the nucleosome
4. z-score
5. supporting reads from all histone modification bam files
6. noise signal from the (preprocessed) control experiment
7. p-value obtained from the comparison between field 5 and field 6
8. fuzzyness score (a secondary score, not very important)

(more than one field):  for each histone mark, the number of supporting reads
(more than one field):  for each histone mark, a flag that says whether the mark is absent or present


## Software package

This analysis uses the [NucHunter](http://epigen.molgen.mpg.de/nuchunter/) program, available at: http://epigen.molgen.mpg.de/nuchunter/

## Command line with parameters

In the analysis performed for blueprint, two steps have been carried out: (I) fragment size estimation and (II) nucleosome calling.

The following examples show also the exact parameters used for the analysis.

### Fragment size estimation

The fragment size is estimated for each histone modification .bam file in each sample using nucHunter's fraglen subprogram. This parameter was estimated considering only chromosome 1.

Command line used:

    java -Xmx1500m -jar NucHunter.jar fraglen -in infile.bam -reg chr1.bed -sigma 50

where chr1.bed is a bed file with only this one line:
  chr1    1000    240000000

### Nucleosome calling

Nucleosome calling was carried out using nucHunter's callnucs subprogram  (the main one) combining all the histone marks at hand and using the estimated fragment lengths.

Command line used (the backslashes mean that everything is in a single line, the -fLen values are only an example, the previously estimated fragment lengths should be used):

    java -Xmx1500m -jar NucHunter.jar callnucs
    -in H3K27ac.bam -fLen 181
    -in H3K36me3.bam -fLen 183 
    -in H3K4me1.bam -fLen 187
    -in H3K4me3.bam -fLen 183
    -in H3K9me3.bam -fLen 182
    -in H3K27me3.bam -fLen 181 
    -ctrl Input.bam
    -sigma 50
  
## Specific Data Requirements for pipeline

The computers must have java installed and more than 1.5 Gbytes of RAM

## Associated Publications:

Alessandro Mammana, Martin Vingron, and Ho-Ryun Chung. Inferring nucleosome positions with their histone mark annotation from ChIP data. Bioinformatics 2013 29: 2547-2554.

## Centre
[Max Planck Institute for Molecular Genetics](http://www.molgen.mpg.de/)

## Contact
* [Alessandro Mammana](mailto:mammana@molgen.mpg.de)


