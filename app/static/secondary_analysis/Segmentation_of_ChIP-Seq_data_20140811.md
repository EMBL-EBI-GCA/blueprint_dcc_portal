# ChromHmm Segmentation of ChIP-Seq data
***

## Analysis description
A model with 12 states was generated for the 34 cell types that had the complete histone modifications set and the input.

## Analysis README
For more details, see [README](http://ftp.ebi.ac.uk/pub/databases/blueprint/releases/20140811/homo_sapiens/secondary_analysis/Segmentation_of_ChIP-Seq_data/README_ChromHmm_release_20140811)

## Data files
[FTP](http://ftp.ebi.ac.uk/pub/databases/blueprint/releases/20140811/homo_sapiens/secondary_analysis/Segmentation_of_ChIP-Seq_data/)

## Data format:

Files:

* model\_12\_Blueprint\_release\_20140811.txt:  The model generated with 12 states
* emissions\_12\_Blueprint\_release\_20140811.txt:  The emission probabilities file tab-delimiter
* emissions\_12\_Blueprint\_release\_20140811.png/svg: Figures with the emission probabilities
* transitions\_12\_Blueprint\_release\_20140811.txt: The transition probabilities file tab-delimiter
* transitions\_12\_Blueprint\_release\_20140811.png/svg: Figures with the transition probabilities
* POSTERIOR\_Blueprint\_release\_20140811.tar.gz:  Includes all the posterior probabilities for each 200bp windows, Twenty-five files (one each for chr1-22,X,Y & M) per sample with posterior probabilities. Format: TAB-delimited file of the probability of each state in each bin
* STATEBYLINE\_Blueprint\_release\_20140811.tar.gz: Includes the state with the highest posterior probability for each 200bp windows.
* SEGMENTATION\_files\_Blueprint\_release\_20140811.tar.gz: The segmentation files, One bed file per sample with genomic segmentation. Format: 9 coloums BED file
* VISUALIZATION\_files\_Blueprint\_release\_20140811.tar.gz: Files for segmentation visualization. Two bed files per sample for UCSC visualization. Format: 11 columns BED file.

More details about formats in: http://compbio.mit.edu/ChromHMM/ChromHMM_manual.pdf

## Command line

1. Remove duplicate reads: samtools v0.1.16(r963:234)

    `samtools rmdup -s <file>.bam <file>_RM.bam`

2. Convert bam to bed file: bedtools v2.18.2

    `bamToBed -i <file>_RM.bam > <file>_RM.bed`

3. Zip the bed file: gzip 1.3.12

    `gzip <file>_RM.bed`

4. Data Binarization: Chip-seq data is binarized in 200bp with BinarizeBed function from ChromHmm package v1.03

    `java -mx20G -jar ChromHMM.jar BinarizeBed -c <controldir> /<path>/ChromHMM/CHROMSIZES/hg19.txt <inputbeddir> <datafile>  <outputbinarydir>`

* Files required:
 * Control aligment files
 * Histone modification aligment files
 * File with chromosome sizes. A two column tab delimited file with the first column being the chromosome and the second being the chromosome length (hg19.txt can be found in CHROMSIZES directory where ChromHmm was installed)
 * Data file. A tab delimited file each row contains the cell type or other identifier for a groups of marks,
         then the associated mark, then the name of a bed file, and optionally a corresponding control bed file. Example:

            NE1_PB_C000S5H1     H3K27ac C000S5H1.H3K27ac.bwa_filtered.20130401_RM.bed.gz        C000S5H1.Input.bwa_filtered.20130401_RM.bed.gz
            NE1_PB_C000S5H1     H3K27me3        C000S5H1.H3K27me3.bwa_filtered.20130401_RM.bed.gz       C000S5H1.Input.bwa_filtered.20130401_RM.bed.gz
            NE1_PB_C000S5H1     H3K36me3        C000S5H1.H3K36me3.bwa_filtered.20130401_RM.bed.gz       C000S5H1.Input.bwa_filtered.20130401_RM.bed.gz

5. Learn Model and genomic segmentation: ChromHmm package v1.03

    `java -mx20G -jar ChromHMM.jar LearnModel -i <outfileID> -l /<path>/ChromHMM/hg19.txt -printposterior -printstatebyline  <BINARIZED_files_dir> <outputdir> numstates <assembly_dir>`

*   Files required:
 * File with chromosome sizes. A two column tab delimited file with the first column being the chromosome and the second being the chromosome length (hg19.txt can be found in CHROMSIZES directory where ChromHmm was installed)
 * The Binarized files generated in the 4th step
 * The assembly directory path with the annotations

More details about ChromHmm software can be found in [the manual](http://compbio.mit.edu/ChromHMM/ChromHMM_manual.pdf).

## Source code
[ChromHMM package v1.03](http://compbio.mit.edu/ChromHMM/)

## Publication
[ChromHMM: automating chromatin-state discovery and characterization](http://www.nature.com/nmeth/journal/v9/n3/full/nmeth.1906.html)

## Centre
[Centro Nacional de Investigaciones Oncológicas](http://cnio.es)

## Contact
* [Enrique Carrillo](mailto:ecarrillo@cnio.es)

