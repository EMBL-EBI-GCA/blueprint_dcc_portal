# RnBeads analysis of DNA methylation profiles
***

## Analysis description
RnBeads (version 0.99.18) was applied to the 2014-01-28 data release of the Blueprint DNA methylation data as measured by Whole Genome Bisulfite Sequencing WGBS).

## Analysis README
For more details, see [README](http://ftp.ebi.ac.uk/pub/databases/blueprint/releases/20150128/homo_sapiens/secondary_analysis/RnBeads_analysis_for_Methylation_data/README_RnBeads_analysis_for_Methylation_data_20150128)

## Data files:
[FTP](http://ftp.ebi.ac.uk/pub/databases/blueprint/releases/20150128/homo_sapiens/secondary_analysis/RnBeads_analysis_for_Methylation_data/)

## RnBeads server

[Link](http://rnbeads.mpi-inf.mpg.de/reports/blueprint/release201501_v1/index.html)

## Trackhub link
* [Hub](http://rnbeads.mpi-inf.mpg.de/reports/blueprint/release201501_v1/tracks_and_tables_data/sites/trackHub_bigBed/hub.txt)
* [UCSC](http://genome.ucsc.edu/cgi-bin/hgTracks?db=hg19&hubUrl=http://rnbeads.mpi-inf.mpg.de/reports/blueprint/release201501_v1/tracks_and_tables_data/sites/trackHub_bigBed/hub.txt)
* [Ensembl](http://grch37.ensembl.org/Homo_sapiens/Location/View?g=ENSG00000130544;contigviewbottom=url:http://rnbeads.mpi-inf.mpg.de/reports/blueprint/release201501_v1/tracks_and_tables_data/sites/trackHub_bigBed/hub.txt;format=DATAHUB;menu=Blueprint data) 

## Data format

sample\_methylation\_summary\_Blueprint\_release\_20150128.csv

    sampleName                                : Name of the sample
    *_num (* can be 'sites' or a region type) : Number of sites or regions with coverage in the sample
    *_covgMean                                : Mean coverage of sites or regions in the sample
    *_covgMedian                              : Median coverage of sites or regions in the sample
    *_covgPerc25,75                           : 25 and 75 percentile of coverage of sites or regions in the sample
    *_numCovg5,10,30,60                       : Number of sites or regions with coverage greater or equal to 5,10,30,60
    **_numSitesMean (** is any region type)   : Mean number of sites in a region
    **_numSitesMedian (** is any region type) : Median number of sites in a region
    **_numSites2,5,10,20                      : Number of regions with at least 2,5,10,20 sites with valid methylation measurements

## Command line:
[R Manual](http://rnbeads.mpi-inf.mpg.de/data/RnBeads.pdf)

Imported custom regions for the analysis include 1kb genome-wide tiling regions (tiling1kb) and Gencode promoters (Gencode verison 15; bpGencode15Promoters).

Explicitely specified options for the RnBeads pipeline are:

    region.types                                 :  tiling,cpgislands,bpGencode15Promoters
    identifiers.column                           :  SAMPLE_NAME_EXT
    colors.category                              :  #1B9E77,#D95F02,#7570B3,#E7298A,#66A61E,#E6AB02,#A6761D,#666666,#2166AC,#B2182B,#00441B,#40004B,#053061
    colors.meth                                  :  #EDF8B1,#41B6C4,#081D58
    min.group.size                               :  1
    max.group.count                              :  14
    import.table.separator                       :  \t
    import.bed.style                             :  EPP
    qc.coverage.plots                            :  false
    filtering.sex.chromosomes.removal            :  true
    filtering.missing.value.quantile             :  0.5
    filtering.coverage.threshold                 :  5
    filtering.low.coverage.masking               :  true
    filtering.high.coverage.outliers             :  true
    filtering.greedycut                          :  false
    exploratory.columns                          :  cellType2,TISSUE_TYPE,DONOR_SEX
    exploratory.intersample                      :  false
    exploratory.region.profiles                  :  bpGencode15Promoters
    differential.site.test.method                :  limma
    differential.comparison.columns              :  DONOR_SEX,bloodLineage,cmp_myo_1,cmp_myo_2,cmp_myo_3,cmp_myo_4,cmp_myo_6,
                                                    cmp_myo_7,cmp_myo_10,cmp_myo_13,cmp_myo_14,cmp_myo_15,cmp_lymph_1,cmp_lymph_2,cmp_lymph_3, 
                                                    cmp_lymph_4,cmp_lymph_5,cmp_lymph_6,cmp_lymph_8,cmp_cross1,cmp_cross2,cmp_cross3, 
                                                    cmp_cross4,cmp_cross5,cmp_cross6,cmp_cross7,cmp_cross8,cmp_cross9,cmp_cross10,cmp_cross11,cmp_cross12
    differential.comparison.columns.all.pairwise :  bloodLineage
    differential.enrichment                      :  true
    replicate.id.column                          :  DONOR_ID
    export.to.trackhub                           :  bigBed
    disk.dump.big.matrices                       :  true
    enforce.memory.management                    :  true
    gz.large.files                               :  true


## Publication

Assenov, Y., Müller, F., Lutsik, P., Walter, J., Lengauer, T., Bock, C. (2014). Comprehensive analysis of DNA methylation data with RnBeads. Nature Methods, 11(11), 1138–1140. doi:10.1038/nmeth.3115

## Source code/Package:
[R package RnBeads v 0.99.18](http://rnbeads.mpi-inf.mpg.de/installation.php)

## Centre: 
[Max Planck Institute for Informatics](http://mpi-inf.mpg.de)

##Contacts:
* [Fabian Müller](mailto:fmueller@mpi-inf.mpg.de)
