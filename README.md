# Introduction 
Inline odds is a web component which provides a tag: 

    <inline-odds id="2958451129">N/A</inline-odds>

For an example of useage, please see index.html.

# Links
Clicking on the odds will take the user to the lancebetting website with the corresponding outcome added to the betslip. If there are no odds, it will just take the user to the lancebetting home page.

e.g.

https://lancebet-com-uat.eyasgaming.net/?affiliateId=AY2838324479&coupon=single|2958451129||append|lancebet

**NOTE:** the produdction kambi and lancebet sites are not yet live, so non prod must be used.  links to the non prod lancebet site (lancebet-com-uat.eyasgaming.net) can only be "seen" if the IP of the user is whitelisted with Eyas.  Please contact simon.hobbs@eyasgaming.com for whitelisting.

# Environment
It can either point to the production kambi/eyas environment, or the non production.
This is controlled by the attribute:     
    prod = false;  or   prod = true;

# styling the odds
You can control the style of the odds in your CSS, e.g:

        inline-odds {
            border-radius: 5px; 
            padding: 5px 5px 5px 5px;
            background:  #F8F838;
        }

# Outcome Id
The Id is a valid kambi outcome ID.  
To get this ID, you can use: https://kambi-explorer.eyasgaming.net/.
Currently this is for non prod only, but an environment drop down will be added later.
To get an outcome id, first select "Main" from the markets dropdown, either search or navigate to the required market, then click on the required outcome which will add the id to the paste buffer.  Then you can paste this ID into the inline-odds tag.

# Default text.
If the outcome does not exist, or the match has ended, the inner text in inline-odds component "N/A" in the above exmaple is shown.

# How to include:
Add  `<script src="./js/odds.js"></script>` at the end of the boddy tag.

