function checkForURL(userURL) {
    let checkURL = userURL.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

    if (checkURL == null) {
        document.getElementById("valid").innerHTML = "This URL is not valid !";
        return 0;
    } else {
        return 1;
    }
}
export { checkForURL }