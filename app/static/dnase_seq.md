#DNase I hypersensitivity Analysis Pipeline
***

This describes the DNase-seq analysis performed for the blueprint project.

##Mapping

The mapping was carried out using bwa 0.5.9 to a gender matched reference. 
Our reference file can be found in  ftp://ftp.ebi.ac.uk/pub/databases/blueprint/releases/20130301/homo_sapiens/reference

Command line used:

    bwa aln -q 15 -t 2 grch37.fa input.fastq.gz > intermediate.sai ; bwa samse -r "read group information" grch37.fa intermediate.sai input.fastq.gz | samtools view -bS - > output.bam

##Filtering

The output bam file was then filtered to remove reads with Mapping Quality less than 15

Command line used:

    samtools view -b -q 15 input.bam > output.bam


##Peak Calling

Hotspot v3 is used for tracing DNaseI hypersensitive genomic regions.

File paths in runall.tokens.txt were adjusted to our local implementation according to the instructions in the Hotspot documentation. A K-mer size of 36 was used in the analyses and the included hg19.K36.mappable_only.bed file was used to mark the uniquely mappable regions in the hg19 genome.

Hotspots runs were performed by modifying the variable _TAGS_ to point to the BAM file.

If you have any questions about this process please email blueprint-info@ebi.ac.uk

##Links

* [SAMtools](http://samtools.sourceforge.net)
* [Reference Data Sets](ftp://ftp.ebi.ac.uk/pub/databases/blueprint/releases/20130301/homo_sapiens/reference)
* [BWA](http://bio-bwa.sourceforge.net/)
* [Hotspot](http://www.uwencode.org/proj/hotspot-ptih/)
