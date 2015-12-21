if (window.location.hash == "#nj") {

document.getElementById("Nightly Jobs").click();
}

else if (window.location.hash == "#deploy") {

document.getElementById("Deploy Versions").click();
}

else if (window.location.hash == '#vhistory') {

document.getElementById("Version History").click();
}
else if (window.location.hash == '#njDuration'||window.location.hash == '#njduration') {

document.getElementById("Job Run Time").click();
}
else
{
navBar('nj')

}
