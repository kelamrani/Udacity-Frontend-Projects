/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty - length be 0.
         */
        it('url not empty', function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty - by checking its length to be 0.
         */
        it('name not empty', function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    /* testing the menu unit */
    describe('The menu', function(){

        /* Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         *
         * This is done by checking if the menu has the class attribute menu-hidden or not.
         * if menu-hidden class exists, it means the menu is hidden.
         */
        it('hidden by default', function(){
            var menuClassName = document.getElementsByTagName("BODY")[0].classList;
            expect(menuClassName).toContain('menu-hidden');
        });

        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         *
         * Toggles a click action for the button that opens/closes the menu.
         * Gets the class attribute. "" means the menu is viewable, menu-hidden means its hidden
         */
        it('menu shown/hidden when toggled', function(){
            var button = document.getElementsByClassName('menu-icon-link')[0];
            button.click();
            var menu = document.getElementsByTagName("BODY")[0].classList;
            expect(menu).not.toContain('menu-hidden');
            button.click();
            menu = document.getElementsByTagName("BODY")[0].classList;
            expect(menu).toContain('menu-hidden');
        });
    });

    describe('Initial Entries', function(){
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         *
         * This is done async, onces the feed is loaded, we check that the feeds are more than 0 to make sure the elements
         * are loaded.
         */
        beforeEach(function(done){
            loadFeed(0,done);
        });

        it('ensure loadFeed has at least 1 element', function(){
            expect(document.querySelectorAll('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function(){
        /* test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         *
         * This section only checks to see if a feed is loaded. To check this i've chosen to make sure that
         * both the header-title (which is the name of the feed) and the first RSS feed are changed when they are loaded.
         * As this function only checks if the loadFeed loads new feed, and doesn't need to check weather each of the 5 feeds
         * are unique, i've chosen to load the first and second feed and compare to make sure the loadfeed function
         * did its job.
         */

        var title;
        var feed;
        beforeEach(function(done){
            loadFeed(0, function(){
                title = document.getElementsByClassName('header-title')[0].innerHTML;
                feed = document.getElementsByClassName('entry-link')[0].innerHTML;
                loadFeed(1, function(){
                    done();
                });
            });
        });

        it('ensure that loadFeed contents actually change', function(){
            var secondHeader = document.getElementsByClassName('header-title')[0].innerHTML;
            var secondFeed = document.getElementsByClassName('entry-link')[0].innerHTML;
            expect(title).not.toBe(secondHeader);
            expect(feed).not.toBe(secondFeed);
        });


    });
}());
