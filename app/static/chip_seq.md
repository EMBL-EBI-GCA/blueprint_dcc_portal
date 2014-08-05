#ChIP-Seq Analysis Pipeline


##Mapping

The mapping was carried out using bwa 0.5.9 to a gender matched reference. Our reference file can be found in ftp://ftp.ebi.ac.uk/pub/databases/blueprint/releases/20130301/homo_sapiens/reference

Command line used:


    bwa aln -q 15 -t 2 grch37.fa input.fastq.gz > intermediate.sai ; bwa samse -r "read group information" grch37.fa intermediate.sai input.fastq.gz | samtools view -bS - > output.bam


##Filtering

The output bam file was then filtered to remove reads with Mapping Quality less than 15

Command line used:

    samtools view -b -q 15 input.bam > output.bam

##Modelling Fragment Size


The fragment size is modelled using the PhantomPeakQualTools R script:

    run_spp.R -c=output.bam -rf -out=params.out

##Peak Calling

MACS2 (2.0.10.20131216) is used for peak calling with the fragment size predicted by PhantomPeakQualTools. We used both the standard method of running and the -broad flag depending on the mark in question

Command line used:

    macs2 callpeak -t chip.bam -n a_sensible_name --gsize hs -c input.bam --nomodel --shiftsize=half_fragment_size --broad

    macs2 callpeak -t chip.bam -n a_sensible_name --gsize hs -c input.bam --nomodel --shiftsize=half_fragment_size

The marks where -broad were used are

 1. H3K27me3
 2. H3K36me3
 3. H3K9me3
 4. H3K4me1

The default marks are

 1. H3K27ac
 2. H3K4me3
 3. H3K9/14ac
 4. H2A.Zac

##Wiggle plots

Signal plots are produced using align2RawSignal using the fragment size predicted by PhantomPeakQualTools. Sex specific fasta and [umap](http://ftp.ebi.ac.uk/pub/databases/blueprint/reference/mappability/) files are used.

    align2rawsignal -i=chip.bam -of=bg -o=chip.bg -l fragment_size -s=/path/to/fasta_files -u=/path/to/umap_files

##Links

 * [SAMtools](http://samtools.sourceforge.net)
 * [Reference data](ftp://ftp.ebi.ac.uk/pub/databases/blueprint/releases/20130301/homo_sapiens/reference)
 * [BWA](http://bio-bwa.sourceforge.net/)
 * [MACS2](https://pypi.python.org/pypi/MACS2)
 * [PhantomPeakQualTools](http://code.google.com/p/phantompeakqualtools/)
