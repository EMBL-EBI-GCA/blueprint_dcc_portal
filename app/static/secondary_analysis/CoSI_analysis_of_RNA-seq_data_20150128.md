# CoSI and other sample specific RNA-Seq analysis
***

## Analysis description
Details about analysis can be found at: [pdf](https://github.com/pervouchine/ipsa/blob/master/latex/sjpipeline.pdf)

## Analysis README
For more details, see [README](http://ftp.ebi.ac.uk/pub/databases/blueprint/releases/20150128/homo_sapiens/secondary_analysis/CoSI_analysis_of_RNA-seq_data/README_CoSI_analysis_of_RNA-seq_data_20150128)

## Data files
[FTP](ftp://ftp.ebi.ac.uk/pub/databases/blueprint/releases/20150128/homo_sapiens/secondary_analysis/CoSI_analysis_of_RNA-seq_data/)

## Source code/Package 
[ipsa](https://github.com/pervouchine/ipsa/releases/tag/v3.3)

## Command line
Annotation and genome file had to be preprocessed, according to the documentation. To generate and run the pipeline we followed the instruction in section 2 of the documentation, under "Pipeline generator":   

    perl Perl/make.pl -dir data -param '-maxnh 1' -group labExpId 
    -genome /project/blueprint/genome/Homo_sapiens.GRCh37.chromosomes.chr
    -annot /projects/blueprint/annotation/gencode.v15.annotation.gtf
    -margin 4 -mincount 10 -merge bp < blueprint-index.txt > blueprint.mk
  
 and

    make -j 8 -k -f blueprint.mk all E06


The information about read strandedness and length is taken automatically from the 'readLength' tag within the index file.

## Data index:
  Data files from COSI anlysis are listed in the [index file](http://ftp.ebi.ac.uk/pub/databases/blueprint/releases/20150128/homo_sapiens/secondary_analysis/CoSI_analysis_of_RNA-seq_data/CoSI_analysis_of_RNA-seq_data_20150128.index)
 
Data index format:

  Data index format is similar to the format described in [README.20150128.data.index](http://ftp.ebi.ac.uk/pub/databases/blueprint/releases/20150128/homo_sapiens/README.20150128.data.index)
  
## Data format

### ipsa_junctions*.gff:  
  This GFF file contains information about detected junctions. 
  
   Description of the attributes used in the GFF file: 
  
  * IDR is a measure of irreproducibility which is useful when having 2 bioreplicates. 
  * annot is a tag for the annotation status, where 0 is novel, 1 is novel intron but known junctions, 2 is novel don or acc and 3 is annotated
  * count is the number of reads supporting the junction
  * entr is an entropy measure of the distribution of the offsets with respect to the read position relative to the junction
  * nucl is the nucleotide sequence of splice sites (e.g. GTAG)
  * stagg is the number of staggered reads (i.e., the number of different offsets with non-zero counts)

### splicing_ratios.*.gff: 
  This GFF file contains the splicing indeces for exons and introns, as well as the read counts used to compute those indeces.


## Publication
[Intron-Centric Estimation of Alternative Splicing from RNA-seq data](http://bioinformatics.oxfordjournals.org/content/early/2012/11/21/bioinformatics.bts678)

## Centre
[Center for Genomic Regulation](http://crg.eu/)

## Contacts

* [Dmitri Pervouchine](mailto:dmitri.pervouchine@crg.eu)
* [Alessandra Breschi](mailto:Alessandra.Breschi@crg.eu)
* [Sarah Djebali](mailto:Sarah.Djebali@crg.eu)
* [Emilio Palumbo](mailto:Emilio.Palumbo@crg.eu)
* [Sebastian Ullrich](mailto:Sebastian.Ullrich@crg.eu)
* [Roderic Guigo Serra](mailto:roderic.guigo@crg.eu)

