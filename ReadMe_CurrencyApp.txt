
		------------------------------------------------------------------------------------------
		-------------------------- Software Design: Currency App ReadMe --------------------------
		------------------------------------------------------------------------------------------
		__________________________________________________________________________________________

		Download Distribution Copy at: https://drive.google.com/open?id=1Cp07Oa_dBKSZ26ZA2-BXY1IzrLwnz80c


	(1)	This is an Electron Application.  Electron is a framework for rendering standalone
		desktop applications buildt on node.js/html/css.
 	
		The first thing you will notice is that this application is very large ( approx 125 MB).
		Every electron app comes bundled with a fully functional chromium browser which renders
		the front end.  Electron is therefore inefficient for small scale apps, and very
		powerful for large scale apps.  The threshhold memory footprint is unappealing but is
		far from prohibitive with modern hardware.  Thus, our experience as a group with electron is a
		a valuable one which can be extended to writing large-scale desktop applications, or
		leveraged for web-based design.


	(2)	How to run this application:
		
		-There is a link to Google Drive for a distribution installation copy
	
		https://drive.google.com/open?id=1Cp07Oa_dBKSZ26ZA2-BXY1IzrLwnz80c

		-Download, unzip, and run the installer.
		-You should now have a desktop launch icon.
		-Run the application.

	(3)	How to use:
		See Image File



  	(4) 	Backlog/Bugs:  
		(1)Wait a few seconds on Launch before clicking "Make Selection"  as it will occasionally cause
		a null list to load.  If this happens, delete the list object and make a new on.  This is more
		if a problem while running in debug mode, seems to be less of an issue with the dist version.

		(2) (minor) If you try to track two or more of the same symbol, the GUI will get confused and indicate
		that the 2nd instance is still active even though it is not.  Toggle the active button several times to reset, 
		or avoid selecting the saemm symbol twice

		(3) Dropdown lists near the bottom of the app get cutoff.
		
		(4) Class tethering and cross-referencing should be looked at more closely for further de-tethering

		