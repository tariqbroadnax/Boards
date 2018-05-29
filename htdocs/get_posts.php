<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "boards";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

$url =  "//{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}";

$parts = parse_url($url);

$limit = 30;
$offset = 0;
$sortby = "best";

if(array_key_exists("query", $parts))
{
    parse_str($parts['query'], $query);

    if(array_key_exists("limit", $query))
        $limit = $query["limit"];

    if(array_key_exists("offset", $query))
        $offset = $query["offset"];
    
    if(array_key_exists("sortby", $query))
        $sortby = $query["sortby"];
}

if($sortby == "new")
    $orderbyStr = " ORDER BY creationDate desc";
else if($sortby == "best")
    $orderbyStr = " ORDER BY (upvotes - downvotes)";
else
    $orderbyStr = " ORDER BY (upvotes - downvotes) / UNIX_TIMESTAMP(creationDate)";


$sql = "SELECT title, posterUsername, creationDate, views, upvotes, downvotes FROM posts limit ".$limit." offset ".$offset;
$result = $conn->query($sql);

$stack = array();

while($row = $result->fetch_assoc()) 
{
    $post = new \stdClass();
    $post->title=$row["title"];
    $post->posterUsername=$row["posterUsername"];
    $post->creationDate=strtotime($row["creationDate"]);
    $post->views=intval($row["views"]);
    $post->upvotes=intval($row["upvotes"]);
    $post->downvotes=intval($row["downvotes"]);
    
    $sql = "SELECT COUNT(*) as ncomments FROM comments WHERE username = ".$row["posterUsername"].$orderbyStr;
    
    $result2 = $conn->query($sql);
    $row = $result->fetch_assoc();
    
    $post->comments=intval($row["ncomments"]);

    array_push($stack, $post);
}

$myJSON = json_encode($stack);

echo $myJSON;

$conn->close();
?>