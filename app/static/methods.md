#Methods
***
## Experimental methods
* Experimental protocols are documented on the main [BLUEPRINT website](http://www.blueprint-epigenome.eu/index.cfm?p=7BF8A4B6-F4FE-861A-2AD57A08D63D0B58)

## Primary analysis methods (on GRCh38)

Members of the consortium have developed pipelines to analyse the data produced by the project consistently. The publicly distributable data is listed on the [file list](#/files).

* BS-seq reads are aligned using GEM, and methylation status is determined with bs\_call. ([link](#/md/bs_seq_grch38)) 
* ChIP-seq reads are aligned using BWA and enriched regions are called using MACS2. ([link](#/md/chip_seq_grch38))
* DNAse-seq reads are aligned using BWA and enriched regions are called using Hotspot. ([link](#/md/dnase_seq_grch38))
* RNA-seq reads are aligned using GEM and transcription is quantified with FLUX capacitor. ([link](#/md/rna_seq_grch38))

 
### Method details for primary data analysis on human genome GRCh37 can be found here
 
* BS-seq reads are aligned using GEM, and methylation status is determined with bs\_call. ([link](#/md/bs_seq_grch37)) 
* ChIP-seq reads are aligned using BWA and enriched regions are called using MACS2. ([link](#/md/chip_seq_grch37))
* DNAse-seq reads are aligned using BWA and enriched regions are called using Hotspot. ([link](#/md/dnase_seq_grch37))
* RNA-seq reads are aligned using GEM and transcription is quantified with FLUX capacitor. ([link](#/md/rna_seq_grch37))
* For a subset of samples (progenitor cells), RNA-seq reads are aligned to the transcriptome using bowtie and transcription is quantified with MMSEQ. ([link](#/md/rna_seq_cu_grch37))


<!-- ##Secondary analysis methods

The secondary analysis products are described in more detail [here](#/md/secondary_analysis).

* Cell-type specific DNase-hypersensitive sites and co-occurring transcription factors analysis ([link](#/md/secondary_analysis/Cell-type_specific_DNase-hypersensitive_sites_20150128))
* CoSI and other sample specific RNA-Seq analysis ([link](#/md/secondary_analysis/CoSI_analysis_of_RNA-seq_data_20150128))
* Ensembl Regulatory Build with cell type specific activity ([link](#/md/secondary_analysis/Ensembl_Regulatory_Build_20150128))
* Nucleosome detection and histone annotation ([link](#/md/secondary_analysis/Nucleosome_detection_and_histone_annotation_20150128))
* PCA analysis of ChIP-Seq data ([link](#/md/secondary_analysis/PCA_analysis_of_ChIP-Seq_data_20150128))
* RnBeads analysis of DNA methylation profiles ([link](#/md/secondary_analysis/RnBeads_analysis_for_Methylation_data_20150128))
* ChromHmm Segmentation of ChIP-Seq data ([link](#/md/secondary_analysis/Segmentation_of_ChIP-Seq_data_20150128))
-->

