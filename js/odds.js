
// usage: <inline-odds id="123456"></inline-odds>
// 

const template = document.createElement('template');

template.innerHTML = `
    <span id="odds"><a href="url" target="lancebet"></a></span>
  `

class Odds extends HTMLElement {

    affiliateId = "AY2838324479"

    // Do not edit anyething below this line
    nonProdUrl = "https://graphql.cts.kambicdn.com"
    prodUrl = "https://graphql.kambicdn.com"

    nonProdTarget = "https://lancebet-com-uat.eyasgaming.net/home"
    prodTarget = "https://www.lancebetting.com/home"

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

    get prod() {
        const isProd = this.getAttribute('prod');

        // return true if isProd is not defined
        return isProd === null || isProd === 'true';

    }

    connectedCallback() {
        this.$odds = this._shadowRoot.querySelector('a');
        this.$odds.innerHTML = "-,-";
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
            .catch( (error) => this.$odds.innerHTML = this.textContent);
    }

    renderPrice(price) {
        this.$odds.innerHTML = (Number(price) / 1000).toFixed(2).toLocaleString();
        this.$odds.href = this.target + "?affiliateId=" + this.affiliateId + "&coupon=single|" + this.id + "||append|lance";
    }

}

window.customElements.define('inline-odds', Odds);