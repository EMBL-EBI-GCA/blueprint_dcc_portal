# PCA analysis of ChIP-Seq data
***

## Analysis description
Principle component analysis (PCA) is a dimension reduction strategy, that is used in exploratory data analysis. In PCA a mathematical algorithm fits new dimensions to the input data, in such a way that these dimensions explain most variability.  

In PC-a-machine samples are compared using a multi intersection of (ChIP) peak calls as dimensions. A matrix of samples and their binarized signals over the intersected regions is generated using bedtools multiinter. The transposed matrix is used as input for the “prcomp” function in R to perform the PCA.

## Analysis README
For more details, see [README](http://ftp.ebi.ac.uk/pub/databases/blueprint/releases/20150128/homo_sapiens/secondary_analysis/PCA_analysis_of_ChIP-Seq_data/README_PCA_analysis_of_ChIP-Seq_data_20150128)

## Data files
[3D-plots](http://ftp.ebi.ac.uk/pub/databases/blueprint/releases/20150128/homo_sapiens/secondary_analysis/PCA_analysis_of_ChIP-Seq_data/3D_plots)

[2D-plots](http://ftp.ebi.ac.uk/pub/databases/blueprint/releases/20150128/homo_sapiens/secondary_analysis/PCA_analysis_of_ChIP-Seq_data/2D_plots)

## Source code/Package:
* [Bitbucket repository](https://hinri@bitbucket.org/hinri/pc-a-machine.git) (restricted access) 
* [FTP](ftp://ftp.ebi.ac.uk/pub/databases/blueprint/releases/20140811/homo_sapiens/secondary_analysis/PCA_analysis_of_ChIP-Seq_data/pc-a-machine_20140811.tar.gz)

## Command line:

    cat list_of_chip-seq_marks.txt|parallel "sh PCAonIndex.sh {} <file index>  <file prefix> <colorAssign> \"donor treatment\" \"ncmls K-562\"";

e.g.

    cat marks.txt|parallel "sh PCAonIndex.sh {} /path/to/index /path cellTypeColor.tsv \"donor treatment\" \"ncmls K-562\"";

Contents of list\_of\_chip-seq_marks.txt:

    H3K4me3
    H3K4me1
    H3K27ac
    H3K36me3
    H3K27me3
    H3K9me3

## Data format:
PDF files containing the following:

* 2D\_plots: Plot of PCA1 vs PCA2 and PCA2 and PCA3
* 3D\_plots: Plot of PCA1 vs PCA2 vs PCA3

## Centre:
[The Radboud Institute for Molecular Life Sciences](http://www.rimls.nl/)

## Contacts: 
* [Hinri Kerstens](mailto:h.kerstens@ncmls.ru.nl) 
