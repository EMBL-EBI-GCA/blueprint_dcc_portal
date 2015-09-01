#Data availability &amp; access
***

##Data Reuse

The Blueprint consortium expects this data to be valuable to other researchers. In keeping with Fort Lauderdale principles, data users may use the data for many studies, but are expected to allow the data producers to make the first presentations and to publish the first paper with global analyses of the data. Our full data reuse statement is available [here](#/md/data_reuse).

##Data access
***
Our data is available both from the sequence archives and from our own FTP site, and through data mining and browsing tools.

<div class="table-responsive">
<table summary="BLUEPRINT Data access summary" class="table table-striped">
	<thead>
		<tr>
			<th>Requirement</th>
			<th>Access</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Raw data</td>
			<td>Data archives (<a href="https://www.ebi.ac.uk/ega/dacs/EGAC00001000135"><abbr title="European Genome-phenome Archive">EGA</abbr></a> &amp; <a href="https://www.ebi.ac.uk/ena"><abbr title="European Nucleotide Archive">ENA</abbr></a>)			
		</tr>
		<tr>
			<td>Processed data</td>
			<td><a href="ftp://ftp.ebi.ac.uk/pub/databases/blueprint">FTP site</a></td>
		</tr>
		<tr>
			<td>Data mining</td>
			<td><a href="http://blueprint-data.bsc.es/">Data portal</a></td>
		</tr>
		<tr>
			<td rowspan="3">Genome browser</td>
			<td><a href="https://blueprint.genomatix.de">Genomatix browser</a></td>
		</tr>
		<tr>
			<td>BLUEPRINT Track Hub on the <a href="http://genome.ucsc.edu/cgi-bin/hgTracks?db=hg38&hubUrl=http://ftp.ebi.ac.uk/pub/databases/blueprint/releases/current_release/homo_sapiens/hub/hub.txt">UCSC browser</a> </td>
		</tr>
		<tr>
			<td>BLUEPRINT Track Hub on the <a href="http://ensembl.org/Homo_sapiens/Location/View?g=ENSG00000130544;contigviewbottom=url:http://ftp.ebi.ac.uk/pub/databases/blueprint/releases/current_release/homo_sapiens/hub/hub.txt;format=DATAHUB;menu=Blueprint%20data">Ensembl browser</a></td>
		</tr>
	</tbody>
</table>
</div>

We provide two web pages to help find data. The [experiments](#/experiments) page
provides links to experiment pages. These describe a particular assay
carried out on a particular sample, with links to both our processed
data and raw data archiving. The [files](#/files) page holds table with a line per
assay and sample with links to our processed data. The experiments and
files pages can both be filtered by sample and experiment types using the left
hand menus.



###Raw data

The majority of samples sequenced by Blueprint are consented for release via a managed access system. To facilitate this we have archived the data in the <a href="https://www.ebi.ac.uk/ega/dacs/EGAC00001000135"><abbr title="European Genome-phenome Archive">EGA</abbr></a>. Users can apply to download data. The process and forms for this can be found on our [DAC applications page](#/md/dac_applications). Data for samples that do not require managed access have been archived with the <a href="https://www.ebi.ac.uk/ena"><abbr title="European Nucleotide Archive">ENA</abbr></a>. In each case, links to the raw data can be found through the [experiment grid](#/experiments). 

###Processed data
The alignments generated for our sequence data are also available from the EGA. All processed data types are available from our ftp site. The main types we make available are defined here:

<div class="table-responsive">
<table summary="BLUEPRINT Data Types" class="table table-striped">
	<thead>
	  <tr>
	    <th>Experiment Type</th>
	    <th>Data Type</th>
	    <th>File Format</th>
	    <th>Example</th>
	  </tr>
	</thead>
	<tbody>
	  <tr>
	    <td>RNA-Seq</td>
	    <td>Quantification</td>
	    <td>Text</td>
	    <td>
	      <a href="ftp://ftp.ebi.ac.uk/pub/databases/blueprint/data/homo_sapiens/GRCh38/Venous_blood/C0010K/CD14-positive_CD16-negative_classical_monocyte/RNA-Seq/MPIMG/C0010KB1.gene_quantification.rsem_grape2_crg.GRCh38.20150622.results">
	      C0010K Monocyte transcript quantification</a>
	    </td>
	  </tr>
	  <tr>
	    <td>RNA-Seq</td>
	    <td>
	      Alignment Signal
	    </td>
	    <td>BigWig</td>
	    <td>
	      <a href="ftp://ftp.ebi.ac.uk/pub/databases/blueprint/data/homo_sapiens/GRCh38/Venous_blood/C0010K/CD14-positive_CD16-negative_classical_monocyte/RNA-Seq/MPIMG/C0010KB1.plusStrand.star_grape2_crg.GRCh38.20150815.bw">
	      C0010K Monocyte plus strand signal</a>
	    </td>
	  </tr>
	  <tr>
	    <td>ChIP-Seq</td>
	    <td>
	      Peak Calls
	    </td>
	    <td>BigBed</td>
	    <td>
	      <a href="ftp://ftp.ebi.ac.uk/pub/databases/blueprint/data/homo_sapiens/GRCh38/Venous_blood/C0010K/CD14-positive_CD16-negative_classical_monocyte/ChIP-Seq/NCMLS/C0010KH1.ERX197174.H3K27ac.bwa.GRCh38.20150526.bb">
	      C0010K Monocyte H3K27ac peak calls</a>
	    </td>
	  </tr>
	  <tr>
	    <td>ChIP-Seq</td>
	    <td>
	      Alignment Signal
	    </td>
	    <td>BigWig</td>
	    <td>
	      <a href="ftp://ftp.ebi.ac.uk/pub/databases/blueprint/data/homo_sapiens/GRCh38/Venous_blood/C0010K/CD14-positive_CD16-negative_classical_monocyte/ChIP-Seq/NCMLS/C0010KH1.ERX197174.H3K27ac.bwa.GRCh38.20150528.bw">
	      C0010K Monocyte H3K27ac signal</a>
	    </td>
	  </tr>
	  <tr>
	    <td>DNase1-Seq</td>
	    <td>Hotspots</td>
	    <td>BigBed</td>
	    <td>
	      <a href="ftp://ftp.ebi.ac.uk/pub/databases/blueprint/data/homo_sapiens/GRCh38/Venous_blood/C0010K/CD14-positive_CD16-negative_classical_monocyte/DNase-Hypersensitivity/NCMLS/C0010K46.ERX197156.Dnase.GRCh38.hotspot.20150709.bb">
	      C0010K Monocyte Dnase hotspots</a>
	    </td>
	  </tr>
	  <tr>
	    <td>DNase1-Seq</td>
	    <td>
	      Alignment Signal
	    </td>
	    <td>BigWig</td>
	    <td>
	      <a href="ftp://ftp.ebi.ac.uk/pub/databases/blueprint/data/homo_sapiens/GRCh38/Venous_blood/C0010K/CD14-positive_CD16-negative_classical_monocyte/DNase-Hypersensitivity/NCMLS/C0010K46.ERX197156.Dnase.bwa.GRCh38.20150529.bw">
	      C0010K Monocyte Dnase signal</a>
	    </td>
	  </tr>
	  <tr>
	    <td>
	      WGS Bisulphite Seq
	    </td>
	    <td>
	      Hypo-methylated Regions
	    </td>
	    <td>BigBed</td>
	    <td>
	      <a href="ftp://ftp.ebi.ac.uk/pub/databases/blueprint/data/homo_sapiens/GRCh38/Venous_blood/C0010K/CD14-positive_CD16-negative_classical_monocyte/Bisulfite-Seq/CNAG/C0010KA2bs.hypo_meth.bs_call.GRCh38.20150707.bb">
	      C0010K Monocyte hypo methylation calls</a>
	    </td>
	  </tr>
	  <tr>
	    <td>
	      WGS Bisulphite Seq
	    </td>
	    <td>
	      Hyper-methylated Regions
	    </td>
	    <td>BigBed</td>
	    <td>
	      <a href="ftp://ftp.ebi.ac.uk/pub/databases/blueprint/data/homo_sapiens/GRCh38/Venous_blood/C0010K/CD14-positive_CD16-negative_classical_monocyte/Bisulfite-Seq/CNAG/C0010KA2bs.hyper_meth.bs_call.GRCh38.20150707.bb">
	      C0010K Monocyte hyper methylation calls</a>
	    </td>
	  </tr>
	  <tr>
	    <td>
	      WGS Bisulphite Seq
	    </td>
	    <td>
	      Methylation Signal
	    </td>
	    <td>BigWig</td>
	    <td>
	      <a href="ftp://ftp.ebi.ac.uk/pub/databases/blueprint/data/homo_sapiens/GRCh38/Venous_blood/C0010K/CD14-positive_CD16-negative_classical_monocyte/Bisulfite-Seq/CNAG/C0010KA2bs.CPG_methylation_calls.bs_call.GRCh38.20150707.bw">
	      C0010K Monocyte methylation call signal</a>
	    </td>
	  </tr>
	</tbody>
</table> 
</div>

<!--
###Secondary analysis

Secondary analysis results are made available as part of the data release cycle. The methods and how to access the results are listed on the [secondary analysis page](#/md/secondary_analysis). 
// -->

##FTP site
The FTP site has 3 major sections listed here and described in more detail below:

 * [data](ftp://ftp.ebi.ac.uk/pub/databases/blueprint/data/): This directory contains all the processed data files described in the above table
 * [release](ftp://ftp.ebi.ac.uk/pub/databases/blueprint/releases/): This directory contains files specific to a particular release, such as meta data and indexes
 * [reference](ftp://ftp.ebi.ac.uk/pub/databases/blueprint/reference/): This directory contain reference data sets used for our analysis, e.g. a GENCODE gene set or reference assembly

###Data

The data directory contains all processed data files as described in the above table. New files will be added each release. Subdirectories are organised by species, tissue type, donor, cell type, production centre and data type. The filename format follows this general form:

<blockquote>
	<tt><strong>sample_name</strong>.experiment.<strong>algorithm_or_pipeline_name</strong>.genome_build.freeze_date.<strong>file_extension</strong></tt>
</blockquote>

e.g.

<blockquote>
	<tt><strong>C0010KA2bs</strong>.hypo_meth.<strong>bs_call</strong>.GRCh38.20150707.<strong>bb</strong></tt>
</blockquote>


File name format for ChIP-Seq and DNase1-Seq

<blockquote>
	<tt><strong>sample_name</strong>.experiment_id.experiment.<strong>algorithm_or_pipeline_name</strong>.genome_build.freeze_date.<strong>file_extension</strong></tt>
</blockquote>

e.g.

<blockquote>
	<tt><strong>C0010KH1</strong>.ERX197174.H3K27ac.<strong>bwa</strong>.GRCh38.20150526.<strong>bb</strong></tt>
</blockquote>

The freeze date in the filename should match the first freeze in which the file was produced.

###Release

The most recent release can be found at [current_release](ftp://ftp.ebi.ac.uk/pub/databases/blueprint/releases/current_release). Each release directory contain an [index file](ftp://ftp.ebi.ac.uk/pub/databases/blueprint/data_index/homo_sapiens/data.index) (list of all files for the specific release), description of analysis pipeline, Track Hub directory and a readme file describing the current index file.

A description for the data index and each analysis pipeline can be found here:

 * [Data Index](ftp://ftp.ebi.ac.uk/pub/databases/blueprint/data_index/homo_sapiens/README.data.index)
 * [Bisulphite-seq analysis](ftp://ftp.ebi.ac.uk/pub/databases/blueprint/protocols/Analysis_protocols/README_bisulphite_analysis_CNAG)
 * [ChIP-seq analysis](ftp://ftp.ebi.ac.uk/pub/databases/blueprint/protocols/Analysis_protocols/README_chipseq_analysis_ebi)
 * [Dnase-seq analysis](ftp://ftp.ebi.ac.uk/pub/databases/blueprint/protocols/Analysis_protocols/README_dnaseseq_analysis_ebi)
 * [RNA-seq analysis](ftp://ftp.ebi.ac.uk/pub/databases/blueprint/protocols/Analysis_protocols/README_rnaseq_analysis_crg)
 
###Reference

The [reference](ftp://ftp.ebi.ac.uk/pub/databases/blueprint/reference/) directory contains the reference materials used for our analysis pipelines. The subdirectories are also dated to allow us to update our reference files. The analysis pipeline readmes should indicate which reference files were used for a particular analysis pipeline.