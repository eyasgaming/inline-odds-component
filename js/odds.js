
// usage: <inline-odds id="123456"></inline-odds>
// 

const template = document.createElement('template');

template.innerHTML = `
    <span id="odds"><a href="url" target="lancebet"></a></span>
  `
//     <span id="odds" style="background: #F8F838; border-radius: 5px; padding: 5px 5px 5px 5px;"><a href="url" target="lancebet" style="background: #F8F838; border-radious 6em">N/A</a></span>

class Odds extends HTMLElement {

    // You can edit these:
    prod = false;
    affiliateId = "AY2838324479"

    // Do not edit anyething below this line
    nonProdUrl = "https://graphql.cts.kambicdn.com"
    prodUrl = "https://graphql.kambicdn.com"

    nonProdTarget = "https://lancebet-com-uat.eyasgaming.net"
    prodTarget = "https://www.lancebet.com"

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.url = this.prod ? this.prodUrl : this.nonProdUrl;
        this.target = this.prod ? this.prodTarget : this.nonProdTarget;
    }

    get id() {
        return this.getAttribute('id');
    }

    connectedCallback() {
        this.$odds = this._shadowRoot.querySelector('a');
        this.$odds.innerHTML = this.textContent
        this.$odds.href = this.target + "?affiliateId=" + this.affiliateId // default url in case no odds found.
        this.getOdds(this.id);
    }

    getOdds(id) {
        const data = JSON.stringify({
            query: `
                query Outcome {
                    outcomes(offering: "eyasgamingbr", market: "BR", outcomeIds: "` + id + `") {
                        outcomes {
                            odds
                            status
                        }
                    }
            }`
        });

        const response = fetch(
            this.url,
            {
                method: 'post',
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': data.length,
                    Authorization:
                        'eyas_gaming',
                },
            }
        ).then((response) => response.json())
            .then((data) => this.renderPrice(data.data.outcomes.outcomes[0].odds))
    }

    renderPrice(price) {
        console.log("prod: " + this.prod)
        console.log("url: " + this.url)
        console.log("target: " + this.target)

        this.$odds.innerHTML = (Number(price) / 1000).toFixed(2);
        this.$odds.href = this.target + "?affiliateId=" + this.affiliateId + "&coupon=single|" + this.id + "||append|lancebet";
    }

}

window.customElements.define('inline-odds', Odds);