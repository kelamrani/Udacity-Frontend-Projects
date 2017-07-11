## Neighborhood Map Project

# Summary

This repository was used to complete Udacity's Front-End Nanodegree Neighborhood Map Project.
 
Google Maps API was used to display the Map, and info window based on the locations chosen by myself.

Knockout JS was used in order to create the list on the off-canvas menu, and to filter the locations (which are reflected on the markers).

3rd Party FourSquare API was used in order to return a top 3 similar stores next to the location based on the category of the store.

Zurb Foundation 6 was used to create the top nav bar and the off-canvas menu.

## Requirements

To develop a single page application featuring a map of a neighborhood of my choice. 

Adding functionality to this map including highlighted locations, third-party data about those locations and various ways to browse the content.

### Part 1: Running the Application


Some useful tips to help you get started:

1. Download the application, or clone it to your local drive
1. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to the top-level of your project directory to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ./ngrok http 8080
  ```

1. Copy the public URL ngrok gives you and enjoy the site! Optional: [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)

### Part 2: How the Application Works

You can find a live version of the application[here](https://rnaccache.github.io/frontend-nanodegree-neighborhood/)

Google Maps loads once, and the markers are immediately shown in their respective location.

The menu button on the top left screen can be used to access the text-input filter, and display a list of locations.
Locations are filtered in realtime, and the search is done by location name.

If you click on a location, the menu closes, you are centered at that location and the info window is displayed (with a little bounce animation on the marker)
Clicking on the marker as well directly will cause the info window to be displayed.

FourSquares API will display a list of 3 similar places based on category.

Incase you get lost and wonder around the map, click on the Re-Center to bring you back to the original location.

### Further Implimentation

Feature Suggestion:

1. Display an info window on the top right when clicking the place with a Google Street View, or a Static Image to visually display the location.
1. Set a Marker for the User's house (with a different image for a marker) and upon clicking another marker, display the quickest route (by car/public transportation/bicycle/foot).
