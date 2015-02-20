# Cell-type specific DNase-hypersensitive sites and co-occurring transcription factors analysis
***

## Analysis description

### Cell-type specific DNase-hypersensitive sites (CTS-DHSs)
List of 10000 windows of length 200bp, sorted by the cell-type specificity. The cell type specificity is calculated as a t-statistics of the deviance from a global mean for each genomic window. The CTS-DHSs are specifically open in the corresponding cell line (and not in other cell lines).

###Co-occurring Transcription factors (TF) on the CTS-DHSs: 
List of TF names sorted by the corresponding significance (log odds score), the results are aggregated by the transcription factor names with various TF motifs (some TFs have more motifs and some motifs correspond to different TFs)

## Analysis README
For more details, see [README](http://ftp.ebi.ac.uk/pub/databases/blueprint/releases/20150128/homo_sapiens/secondary_analysis/Cell-type_specific_DNase-hypersensitive_sites/README_Cell-type_specific_DNase-hypersensitive_sites_20150128)

## Data files
[FTP](http://ftp.ebi.ac.uk/pub/databases/blueprint/releases/20150128/homo_sapiens/secondary_analysis/Cell-type_specific_DNase-hypersensitive_sites/)

## Data format

CVS file with these columns:

1. TF 1
2. TF 2
3. p-value of the hypergeometric test in CTS-DHSs
4. p-value of the hypergeometric test in ubiquitous DHSs
5. logodds score
6. logodds score minimal.

## Software package

To derive CTS-DHSs, R scripts and SparseData library from Mike Love was used. This can be obtained from [GitHub](https://github.com/mikelove/SparseData), or installed directly with R Devtools:

      install.packages("devtools")
      library(devtools)
      install_github("mikelove/SparseData")

To find the significant co-occurring TF pairs, Rscripts and bedtools was used along with TF affinity prediction tool [TRAP](http://trap.molgen.mpg.de/cgi-bin/home.cgi).

## Command line with parameters

CTS-DHSs: Total 10000 most cell-type specific windows of length 200bp was derived, repeat elements are excluded from the analysis.

Co-occurring transcription factors on the CTS-DHSs: Lists of top 5000 CTS-DHSs were used, the top-1000 CTS-DHSs were used to derive a 2x2 contingency tables. Then TF pairs with log odds score > than the 99.5%-quantile were select as significant pairs.


## Specific Data Requirements for pipeline

DNase data from ENCODE (all healthy cell lines) to derive the ubiquitous open CTS-DHSs, TRANSFAC database of TF motifs for the co-occurring TF pairs

## Blueprint Samples in files

Samples: SU-DHL-5 & KARPAS-422 Cell Lines

* TFcobinding\_Cell\_Line\_Germinal\_Center\_B-Cell-Like\_Diffuse\_Large\_B-Cell\_Lymphoma.20150128.csv
* CTSDHS\_Cell\_Line\_Germinal\_Center\_B-Cell-Like\_Diffuse\_Large\_B-Cell\_Lymphoma.20150128.bed

Samples: C0010K, C0011I, C001UY & C00408

* TFcobinding\_Venous\_blood\_CD14-positive\_CD16-negative\_classical\_monocyte.20150128.csv
* CTSDHS\_Venous\_blood\_CD14-positive\_CD16-negative\_classical\_monocyte.20150128.bed

Samples: S001MJ4A, S001MJ48

* TFcobinding\_Venous\_blood\_inflammatory\_macrophage\_1e-10\_20140811.20150128.csv
* CTSDHS\_Venous\_blood\_inflammatory\_macrophage\_20140811.20150128.bed

Samples: C005VG, C006UE 

* TFcobinding\_Venous\_blood\_macrophage.20150128.csv
* CTSDHS\_Venous\_blood\_macrophage.20150128.bed

Samples: S00JS9, S00CTZ, S00HTF, S00C0J

* TFcobinding\_Macrophage\_-\_T\_6days\_B-glucan.20150128.csv
* CTSDHS\_Macrophage\_-\_T\_6days\_B-glucan.20150128.bed

Samples: S00CR2, S00HRJ, S00JQD, S00BXV

* TFcobinding\_Macrophage\_-\_T\_6days\_untreated.20150128.csv
* CTSDHS\_Macrophage\_-\_T\_6days\_untreated.20150128.bed

Samples: S00HSH, S00JRB, S00CS0, S00BYT

* TFcobinding\_Macrophage\_-\_T\_6days\_LPS.20150128.csv
* CTSDHS\_Macrophage\_-\_T\_6days\_LPS.bed

Samples: S00JPF, S00EPZ

* TFcobinding\_Monocyte\_-\_T\_0days.20150128.csv
* CTSDHS\_Monocyte\_-\_T\_0days.bed


## Centre
[Max Planck Institute for Molecular Genetics](http://www.molgen.mpg.de/)

## Contact
* [Alena van Bömmel](mailto:mysickov@molgen.mpg.de)
* [Juliane Perner](mailto:perner@molgen.mpg.de)

