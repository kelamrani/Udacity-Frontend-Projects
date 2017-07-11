## Website Performance Optimization Portfolio Project

# Summary

This repository was used to complete Udacity's Front-End Nanodegree Website Optimization Project.
 
The source code was forked from [Udacity's Github Repo]("https://github.com/udacity/frontend-nanodegree-mobile-portfolio") and the challenge was to optimize this online portfolio for speed!
In particular, to optimize the critical rendering path and make this page render as quickly as possible by applying the techniques that were picked up from the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

## Requirements

The bellow criteria had to be meet in order to successfully complete the assignment:

* PageSpeed Score
   * index.html achieves a PageSpeed score of at least 90 for Mobile and Desktop.
* Getting Rid of Jank
   * Optimizations made to views/js/main.js make views/pizza.html render with a consistent frame-rate at 60fps when scrolling.
   * Time to resize pizzas is less than 5 ms using the pizza size slider on the views/pizza.html page. Resize time is shown in the browser developer tools.
* Documentation
    * A README file is included detailing all steps required to successfully run the application and outlines the optimizations that the student made in index.html and views/js/main.js for pizza.html.
    * Comments in views/js/main.js for pizza.html are present and effectively explain longer code procedures.

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

### Part 2: Changes in the Application (Using Grunt for Production)

Any changes that needs to be done can be done in the src/ directory. 
Once the changes are done and ready for production, you can run[grunt](https://gruntjs.com/)which will copy all files to the dist directory, minify the js and css and reflect the changes in the html code

*Any changes in the html files for minifiying use processhtml, so anything in the html in the form 
```<!-- build:js  js/perfmatters.min.js --> ``` is used for this. [More about grunt-processhtml](https://github.com/dciccale/grunt-processhtml)*

The finalized project is under dist.

### Part 3: PageSpeed Score: Achieve a PageSpeed score of at least 90 for mobile and desktop

This part was completed with a score of **92/100** :white_check_mark: for Mobile and **93/100** :white_check_mark: for Desktop [Click here to view](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Frnaccache.github.io%2Ffrontend-nanodegree-mobile-portfolio%2Fdist%2F)

In order to achieve a PageSpeed score of at least 90 for mobile and desktop, the following was done:

1. Using GitHub.io,[index.html]("https://rnaccache.github.io/frontend-nanodegree-mobile-portfolio/dist")was tested using Google's[PageSpeed Insights]("https://developers.google.com/speed/pagespeed/insights/") to see the current score.
1. Optimized Images, Javascript and CSS resources were downloaded from the PageSpeed insight in order to meet the requirements.
1. On index.html the following changes were made:
    1. print.css was set to media="print"
    1. analytics.js was set to load asynchronously 
    1. styling was set to inline and rest was moved to the bottom to avoid above the fold styling
    
    
TODO: Fix above the fold styling for desktop viewport

### Part 4: Optimize Frames per Second in pizza.html

Two changes were made in views/js/main in order to obtain 60fps while scrolling and resizing the pizza image.

1.  For the scrolling, the document.queryselectorall in the updatePosition() was removed out of the for loop and changed to document.getElemenetsByClassName
    
    ```
     var items = document.getElementsByClassName('.mover');
    
      for (var i = 0; i < items.length; i++) {
        var phase = Math.sin(scrolltop+ (i % 5));
        items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
      }
      ```
1. In order to fix the sizing of the pizza, code under changePizzaSizes was refactored by removing any attribute that was getting the width and pizza containers out of the for loop
    
    ```
     switch(size){
            case "1":
              newWidth = 25;
              break;
            case "2":
              newWidth = 33.3;
              break;
            case "3":
              newWidth = 50;
              break
            default:
              console.log("big in sizeSwitcher");
        }
        //find all pizza containers and change the width
        var randomPizzas = document.getElementsByClassName("randomPizzaContainer");
        for (var i = 0; i < randomPizzas.length; i++) {
          randomPizzas[i].style.width = newWidth + "%";
        }

    ```

### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>

### Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>
