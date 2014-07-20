var fs = require('fs');

// Inputs:
// folder: String. Location where input data files are stored.
// target: String. Location where the summary will be written.
// TODO: oneFile?: Boolean. Optional. Write summary to one file or multiple files where each 10 posts are stored in one file. Default is True (output written to one file).

function jsonEscape(str) {
    return str.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
}

function createSummary(folder, target) {

    if (typeof String.prototype.endsWith !== 'function') {
        String.prototype.endsWith = function (suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };
    }
    if (!folder.endsWith("\\")) {
        folder += "\\";
    }
    if (!target.endsWith("\\")) {
        target += "\\";
    }

    // List all files in folder
    var postFiles = fs.readdirSync(folder);

    var saveCount = 0;
    var failCount = 0;

    var counter = 0;
    var summaries = { posts: [] };

    // Loop over files
    postFiles.forEach(function (postFile) {
        try {
            // Increment counter
            counter += 1;

            // Read JSON file and parse it into an object
            var postContent = fs.readFileSync(folder + postFile, { encoding: 'UTF-8' });
            
            //postContent = '"' + postContent + '"';
            //postContent = jsonEscape(postContent);
            //console.log(postContent);
            var post = JSON.parse(postContent);
            
            // Get only the objects needed for summary
            var summary = {};
            // id
            summary.id = post.id;
            console.log("Post ID: " + post.id);
            // from
            summary.from = post.from;
            // message
            summary.message = post.message;
            // caption
            summary.caption = post.caption;
            // description
            summary.description = post.description;
            // created_time
            summary.created_time = post.created_time;
            // total_likes (likes.data.length)
            if (post.likes != undefined) {
                summary.total_likes = post.likes.data.length;
            }
            // total_comments (comments.data.length)
            if (post.comments != undefined) {
                summary.total_comments = post.comments.data.length;
            }

            if (counter % 10 == 0) {
                // Write objects to file
                fs.writeFileSync(target + "summary_page_" + (counter / 10) + ".json", JSON.stringify(summaries));
                summaries.posts = [];
                console.log("summary_page_" + (counter / 10) + " summary saved");
                saveCount += 1;
            }
            else {
                summaries.posts.push(summary);
            }

        } catch (e) {
            console.log(e);
            console.log(postFile + " failed");
            failCount += 1;
        }
    });

    if (summaries.posts.length != 0) {
        // Write objects to file
        fs.writeFileSync(target + "summary_page_" + Math.ceil(counter / 10) + ".json", JSON.stringify(summaries));
        console.log("summary_page_" + Math.ceil(counter / 10) + " summary saved");
        saveCount += 1;
        summaries.posts = [];
    }

    console.log(saveCount + " file(s) summaries saved with " + postFiles.length + " post(s).");
    console.log(failCount + " failed.");
}

createSummary('D:/Amr/Downloads/SummaryTest/', 'D:/Amr/Downloads/SummaryResult/');