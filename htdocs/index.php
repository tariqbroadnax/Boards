<html>
    <?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "boards";

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    ?>
    <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>

        <link rel="stylesheet" type="text/css" href="style/index.css">
    </head>

    <body class="bg-dark text-light">
        <nav class="navbar navbar-dark bg-info">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="">Boards</a>
                </div>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="sign_in.html">Login</a></li>
                </ul>
            </div>
        </nav>

        <div id="header" class="card bg-dark" >
            <div class="card-body">
                <h2>BOARDS</h2>
                <hr>
                <div>Sort by:
                    <a href="/?sortby=best">Best</a>
                    <a href="/?sortby=hot">Hot</a>
                    <a href="/?sortby=new">New</a>
                </div>
            </div>
        </div>
        <div id="main">
            <div class="container" id="column main">
                <div class="row bg-info" style="cursor: pointer;" onclick="window.location='#';">
                    <div class="col-sm-1" class="voteCol">
                        <span class="numVotes">
                            <span class="netVotes">[netVotes]</span>
                            <span class="votes">
                                <span class="upvotes">[upvotes]</span> | 
                                <span class="downvotes">[downvotes]</span>
                            </span>
                        </span>
                        <br>votes
                    </div>
                    <div class="col-sm-7">
                        <h4 class="title">[title]</h4>
                        <footer>by <a>[username]</a> [timeDescription]</footer>
                    </div>
                    <div class="col-sm-2 commentCol">[numComments]<br>Comments</div>
                    <div class="col-sm-2 viewCol">[numViews]<br>Views</div>
                </div>
            </div>
            <div id="show" class="container">
                <button type="button" class="btn btn-dark" onclick="showMorePosts()">SHOW MORE</button>
            </div>
        </div>
    </body>
    <?php
    $conn->close();
    ?>
    
    <script src="script/index.js"></script>
</html>