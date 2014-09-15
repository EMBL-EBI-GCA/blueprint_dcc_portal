# Ensembl Regulatory Build with cell type specific activity
***

## Analysis description
The Ensembl Regulatory Build provides a genome-wide set of regions that are likely to be involved in gene regulation. These regions are classified into six functional types. On top of these classifications, in each cell type we add an activity annotation, by comparing the classifications in each region to the cell type specific evidence, the cell type specific segmentation states and peak calls.

## Analysis README
For more details, see [README](http://ftp.ebi.ac.uk/pub/databases/blueprint/releases/20140811/homo_sapiens/secondary_analysis/Ensembl_Regulatory_Build/README_ensembl_regulatory_build_20140811)

## Data files
[FTP](http://ftp.ebi.ac.uk/pub/databases/blueprint/releases/20140811/homo_sapiens/secondary_analysis/Ensembl_Regulatory_Build/)

## Trackhub link
* [Hub](http://ftp.ebi.ac.uk/pub/databases/blueprint/releases/20140811/homo_sapiens/secondary_analysis/Ensembl_Regulatory_Build/hub/hub.txt)
* [UCSC](http://genome.ucsc.edu/cgi-bin/hgTracks?db=hg19&amp;hubUrl=http://ftp.ebi.ac.uk/pub/databases/blueprint/releases/20140811/homo_sapiens/secondary_analysis/Ensembl_Regulatory_Build/hub/hub.txt)
* [Ensembl](http://grch37.ensembl.org/Homo_sapiens/Location/View?g=ENSG00000130544;contigviewbottom=url:http://ftp.ebi.ac.uk/pub/databases/blueprint/releases/20140811/homo_sapiens/secondary_analysis/Ensembl_Regulatory_Build/hub/hub.txt;format=DATAHUB;menu=Ensembl) 

## Files Description
* EnsemblRegulatoryBuild.082014.bb: BigBed file containing the Regulatory Features, defining their function.
* cell\_type\_activity\_levels/*.bb: BigBed files containing the same features, greyed out if they are inactive in the corresponding cell type.

## Display Conventions and Configuration

Regions annotated as active are coloured the same as in the multicell Ensembl Regulatory Build. Cell type specific inactive regions are marked in light grey. The colours follow the agreed ENCODE segmentation standard:

* Bright Red - Predicted active promoters
* Light Red - Predicted active promoter flanking regions
* Orange - Predicted active enhancers
* Blue - Active CTCF binding sites
* Gold - Unannotated active transcription factor binding sites
* Yellow - Unannotated active open chromatin regions
* Light Grey - Inactive regions

##Segmentation and annotation of segmentation states

We start by running 2 segmentations:

* One across 17 human cell types (A549, DND-41, GM12878, K562, H1-hESC, HepG2, HeLa-S3, HSSM,
HSSMtube, HUVEC, Monocytes-CD14+, NH-A, NHDF-AD, NHEK, NHLF and Osteoblasts). For the original data see [here](http://ngs.sanger.ac.uk/production/ensembl/regulation/hg19/segmentations/)

* Another was run by the CNIO across 34 BLUEPRINT datasets (BL-2, DG-75, JVM-2, KARPAS-422, SU-DHL-5, U-266, Z-138,
C000S5H1, C000S5H2, C0010KH2, C0011IH2, C00184H2, C001UYH1, C00264H1, C002Q1H1, C002TWH1, C002YMH1,
C004GDH1, C004SQH1, C005PSH2, C12012H1, S000RDH2, S001MJH1, S001S7H2, S0022IH2, S002R5H1, S002S3H1,
S004BTH2, S00622H1, S006VIH1, S007DDH2, S00BKKH1, S00BS4H1 and S00C1HH1). For the original data see [here](http://ftp.ebi.ac.uk/pub/databases/blueprint/releases/20140811/homo_sapiens/secondary_analysis/Segmentation_of_ChIP-Seq_data)

Each segmentation annotates the genomes of its designated cell types with a fixed number of states, which are generally identified with a number.

For each state of each segmentation, we create a summary track which represents the number of cell
types that have that state at any given base pair of the genome. The overlaps of this summary function
with known features (transcription start sites, exons) and experimental features (CTCF binding sites,
known chromatin repression marks) are used to assign a preliminary label to that state. For practical
purposes, this annotation is manually curated. The labels used are either one of the above functional
labels, or non-functional labels (dead, weak or repressed).

## Defining the MultiCell regulatory features

We first determine the a cell type independent functional annotation of the genome, referred to as the
MultiCell Regulatory Build. This build defines the function of genomic regions.

To determine whether a state is useful in practice, it is compared to the overall density of transcription
factor binding (as measured with ChIP-seq). Applying increasing integer cutoffs to this signal, we define
progressively smaller regions. If these regions reach a 2 fold enrichment in transcription factor binding
signal, then the state is retained for the build. This means that although all states are annotated,
not all are used to build the Regulatory Build.


For any given segmentation, we define initial regions. For every functional label, all the state summaries
that were assigned that labelled and judged informative are summed into a single function. Using the overall
TF binding signal as true signal, we select the threshold which produces the highest F-score.

We then merge the regulatory features across segmentations by annotation.

Some simplifications are applied a posteriori:

* Distal enhancers which overlap promoter flanking regions are merged into the latter.
* Promoter flanking regions which overlap transcription start sites are incorporated into the flanking regions of the latter features.

## Extra features

In addition to the segmentation states, which are essentially derived from histone marks, we integrate
independent experimental evidence:

Transcription factor binding sites which were observed through ChIP-seq but are covered by none of the newly
defined features are added to the Build. Open chromatin regions which were experimentally observed but covered
by none of the above annotations, are also added to the Build.

## Cell type specific annotations

The cell type specific regulatory features are identical to the MultiCell ones in position and classification
but have an added activity annotation. Currently this activity state is purely binary (on/off) although this
could be extended to finer annotations (poised, repressed, information not available, ...).

For each cell type and each functional annotation, we check whether there is segmentation state or experimental
evidence which could be used to test the activity of this annotation. If this evidence exists, then all MultiCell
features with that label are annotated as on or off by simple overlap analysis. If this evidence is not available,
these features are not represented in the cell type specific annotation (Note: this could change in the near future).

## Centre
[Ensembl, EMBL-EBI](http://www.ensembl.org/index.html)

## Contact

Blueprint DCC <blueprint-info@ebi.ac.uk>

