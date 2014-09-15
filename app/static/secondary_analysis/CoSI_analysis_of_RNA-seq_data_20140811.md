# COSI and other sample specific RNA-Seq analysis
***

## Analysis description
Details about analysis can be found at: [pdf](https://github.com/pervouchine/ipsa/blob/v1.0/latex/sjpipeline.pdf?raw=true)

## Analysis README
For more details, see [README](http://ftp.ebi.ac.uk/pub/databases/blueprint/releases/20140811/homo_sapiens/secondary_analysis/CoSI_analysis_of_RNA-seq_data/README_CoSI_analysis_of_RNA-seq_data_20140811)

## Data files
[FTP](http://ftp.ebi.ac.uk/pub/databases/blueprint/releases/20140811/homo_sapiens/secondary_analysis/CoSI_analysis_of_RNA-seq_data/)

## Source code/Package 
[ipsa](https://github.com/pervouchine/ipsa/tree/v1.0)

## Command line
Annotation and genome file had to be preprocessed, according to the documentation. To generate and run the pipeline we followed the instruction in section 2 of the documentation, under "Pipeline generator":

    make.pl -dir data/ -margin 4 -mincount 10 -entropy 2
    -annot /projects/blueprint/annotation/gencode.v15.annotation.gtf
    -genome /project/blueprint/genome/Homo_sapiens.GRCh37.chromosomes.chr
    -group labExpId < blueprint-index.txt > blueprint.mk`
  
 and

    make -j 8 -k -f blueprint.mk B07

The information about read strandedness and length is taken automatically from the 'readLength' tag within the index file.

## Data format

## Publication
[Intron-Centric Estimation of Alternative Splicing from RNA-seq data](http://bioinformatics.oxfordjournals.org/content/early/2012/11/21/bioinformatics.bts678)

## Centre
[Center for Genomic Regulation](http://crg.eu/)

## Contacts
* Alessandra Breschi <Alessandra.Breschi@crg.eu>
* Sarah Djebali <Sarah.Djebali@crg.eu>
* Emilio Palumbo <Emilio.Palumbo@crg.eu>
* Sebastian Ullrich <Sebastian.Ullrich@crg.eu>
* Roderic Guigo Serra <roderic.guigo@crg.eu>

