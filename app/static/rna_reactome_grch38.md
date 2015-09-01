# Displaying RNA-seq data in Reactome

This document describes the process of converting the gene quantification results from the RNA-seq analysis pipeline ([Guigo group](#/md/rna_seq_grch38) pipelines) into a format for use with the [Reactome website](http://www.reactome.org).

## Conversion

The RNA-seq files contain an [Ensembl](http://www.ensembl.org) gene ID (ENSG...). This is matched to the gene name found in the [GENCODE](http://www.gencodegenes.org/) annotation file. Genes names that do not appear in the [Reactome pathway list](http://www.reactome.org/download/current/ReactomePathways.gmt.zip) are discarded.
The TPM for each gene is transformed using the arsinh function, provided as part of the [Math::Trig](http://perldoc.perl.org/Math/Trig.html) perl module.  

