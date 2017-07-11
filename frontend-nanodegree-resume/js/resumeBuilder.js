var ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pulvinar pellentesque aliquet. Ut ullamcorper euismod dolor. Sed leo dolor, condimentum vel tortor ut, convallis semper erat. Mauris malesuada mauris id purus laoreet luctus sed non sem. Cras nunc quam, efficitur sit amet vestibulum euismod, cursus sit amet dui.";
var bio = {
    name: "Robert Naccache",
    role: "Front-End Designer",
    contacts:
        {
            mobile: "+9999999",
            email: "Rnaccache@ccc.gr",
            github: "http://www.github.com",
            twitter: "http://twitter.com",
            location: "Porto Rafti"
        },
    welcomeMessage: "Welcome to my Resume",
    skills: ["HTML", "CSS", "Javascript", "C#"],
    biopic: "images/profile.png",
    //Display Header
    display: function()
    {

        //Header Name/Role
        var formattedHeader = HTMLheaderName.replace("%data%", bio.name);
        var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
        var nameDescription = formattedHeader + formattedRole;

        //Contact Info
        var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
        var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
        var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
        var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
        var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
        var contact = formattedEmail + formattedMobile + formattedGithub + formattedTwitter + formattedLocation;

        //Bio picture
        var formattedBioPic = HTMLbioPic.replace("%data%", bio.biopic);
        var welcomeMessage = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);

        //Display above details
        $("#topContacts").append(contact);

        $("#header").prepend(nameDescription);
        $("#header").append(formattedBioPic + welcomeMessage);

        bio.displayFooter(contact);

        //Iterate/display each skill if array not empty
        if (bio.skills.length > 0)
        {
            $("#header").append(HTMLskillsStart);

            bio.skills.forEach(function(skill)
            {
                var formattedSkill = HTMLskills.replace("%data%", skill);
                $("#skills:last").append(formattedSkill);
            });
        }

    },
    //Display footer
    displayFooter: function(contact)
    {
        console.log(contact);
        $("#footerContacts").append(contact);
    }
};
var work = {
    jobs: [
        {
            employer: "CCC",
            title: "RND Software Developer",
            location: "Leofors kifisias 62b marrousi CCC",
            dates: "01/01/2017",
            description: ipsum,
            url: "http://www.ccc.me"
        },
        {
            employer: "CCC",
            title: "IT Support Engineer",
            location: "Leofors kifisias 62b marrousi CCC",
            dates: "05/01/2012",
            description: ipsum,
            url: "http://www.ccc.gr"
        }],
    display: function()
    {

        work.jobs.forEach(function(job)
        {

            $("#workExperience").append(HTMLworkStart);

            var formattedEmployer = HTMLworkEmployer.replace("%data%", job.employer);
            var formattedTitle = HTMLworkTitle.replace("%data%", job.title);
            var formattedLocation = HTMLworkLocation.replace("%data%", job.location);
            var formattedDates = HTMLworkDates.replace("%data%", job.dates);
            var formattedDescription = HTMLworkDescription.replace("%data%", job.description);
            var formattedEmployerTitle = formattedEmployer + formattedTitle + formattedDates + formattedLocation + formattedDescription;

            $(".work-entry:last").append(formattedEmployerTitle);
            $(".work-entry:last").children("a").attr("href", job.url);
        });
    }
};
var projects = {
    projects: [
        {
            title: "Portfolio 1",
            dates: "15/04/2017",
            description: ipsum,
            images: ["https://placeimg.com/300/150/any", "https://placeimg.com/350/150/any"],
            url: "http://www.yahoo.com"
        },
        {
            title: "Portfolio 2",
            dates: "24/04/2017",
            description: ipsum,
            images: ["https://placeimg.com/250/150/any"],
            url: "http://www.google.com"
        }],
    display: function()
    {

        projects.projects.forEach(function(project)
        {

            $("#projects").append(HTMLprojectStart);

            var formattedProjectTitle = HTMLprojectTitle.replace("%data%", project.title);
            var formattedProjectDates = HTMLprojectDates.replace("%data%", project.dates);
            var formattedProjectDescription = HTMLprojectDescription.replace("%data%", project.description);
            var display = formattedProjectTitle + formattedProjectDates + formattedProjectDescription;
            $(".project-entry:last").append(display);

            $(".project-entry:last").children("a").attr("href", project.url);

            project.images.forEach(function(image)
            {
                var formattedProjectImage = HTMLprojectImage.replace("%data%", image);
                $(".project-entry:last").append(formattedProjectImage);
            });

        });
    }
};
var education = {
    schools: [
        {
            name: "Electrical Engineering and Electronics",
            location: "Liverpool University UK",
            degree: "BEng",
            majors: ["Electrical Engineering", "Electronics"],
            dates: "2005-2009",
            url: "http://liverpool.co.uk"
        },
        {
            name: "Microelectronic Systems & Telecommunications",
            location: "Liverpool University UK",
            degree: "MSc",
            majors: ["Telecommunications", "Microelectronic Systems"],
            dates: "2009-2010",
            url: "http://liverpool.co.uk"
        }],
    onlineCourses: [
        {
            title: "Front-end Web Developer Nanodegree",
            school: "Udacity",
            dates: "2017 -2017",
            url: "http://www.udacity.com"
        }],
    display: function()
    {

        //Format Schools
        education.schools.forEach(function(school)
        {

            $("#education").append(HTMLschoolStart);

            var formattedSchoolName = HTMLschoolName.replace("%data%", school.name);
            var formattedSchoolDegree = HTMLschoolDegree.replace("%data%", school.degree);
            var formattedSchoolDates = HTMLschoolDates.replace("%data%", school.dates);
            var formattedLocation = HTMLschoolLocation.replace("%data%", school.location);
            var formattedMajor = HTMLschoolMajor.replace("%data%", school.majors);
            var formattedSchool = formattedSchoolName + formattedSchoolDegree + formattedSchoolDates + formattedLocation + formattedMajor;

            $(".education-entry:last").append(formattedSchool);
            $(".education-entry:last").children("a").attr("href", school.url);

        });

        $("#education").append(HTMLonlineClasses);
        //Format Courses
        education.onlineCourses.forEach(function(course)
        {

            $("#education").append(HTMLschoolStart);

            var formattedOnlineTitle = HTMLonlineTitle.replace("%data%", course.title);
            var formattedOnlineSchool = HTMLonlineSchool.replace("%data%", course.school);
            var formattedOnlineDates = HTMLonlineDates.replace("%data%", course.dates);
            var formattedOnlineURL = HTMLonlineURL.replace("%data%", course.url);

            var formattedOnlineCourse = formattedOnlineTitle + formattedOnlineSchool + formattedOnlineDates + formattedOnlineURL;
            $(".education-entry:last").append(formattedOnlineCourse);
            $(".education-entry:last").children("a").attr("href", course.url);

        });

    }
};

function displayMap()
{
    $("#mapDiv").append(googleMap);
}

//Display sections
bio.display();
work.display();
projects.display();
education.display();

displayMap();