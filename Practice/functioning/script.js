
let menuOpened = false;
function openMenu() {

    if (menuOpened === false)
    {
        document.getElementById("menuLogo").style.height = "300px";
        menuOpened = true;
        document.getElementById("menuItemsId").style.display = "block";
    }
    else if (menuOpened === true)
    {
        document.getElementById("menuLogo").style.height = "75px";
        menuOpened = false;
        document.getElementById("menuItemsId").style.display = "none";
    }
}


