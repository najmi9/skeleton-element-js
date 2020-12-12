/**
 * skeleton element for preloading effect.
 * @author Grafikart
 * @property {ShadowRoot} root
 */
class SkeletonBox extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
    }

    /**
     * generate a unit of dimension if neccesary
     * @param {string} size 
     * @param {boolean} fallBackTo100
     * @return {string}
     */
    size(size, fallBackTo100) {
        if (size) {
            if (size.match(/^[0-9]+$/)) {
                size += 'px';
            }
            return size;
        } else if (fallBackTo100) {
            return '100%';
        }
        return 'auto';
    }

    connectedCallback() {
        const space = '\\00a0';
        const placeholder = this.getAttribute('placeholder') || space;
        const rounded = this.getAttribute('rounded');
        const width = this.size(this.getAttribute('width'), placeholder === space);
        const height = this.size(this.getAttribute('height'));
        const lines = parseInt(this.getAttribute('lines') || 0, 10);

        let spanes = '<span></span>';

        if (lines > 1) {
            for (let i = 1; i < lines; i++) {
                spanes += '<span></span>';
            }
        }

        this.root.innerHTML = /*html*/ `
            <style>
                div{
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                }

                :host{
                    display: block;
                }

                span{
                    position: relative;
                    border-radius: ${rounded !== null ? '50%' : '4px'};
                    width: ${width};
                    height: ${height};
                    background-color: var(--skeleton, #0000001C);  
                    display: block!important; 
                    overflow: hidden;
                    transform: ${placeholder !== space || lines > 0 ? 'scale(1, 0.6)' : 'none'};
                }

                ${lines ? `
                    span:last-child{
                        width: ${20 + Math.random() * 60 + '%'};
                    }
                ` : ''}
              
                span::before{
                    content: '${placeholder}';
                    opacity: 0;
                }

                span::after{
                    content: '';
                    position: absolute;
                    left: 0;
                    right:0;
                    bottom:0;
                    top: 0;
                    animation: waves 1.6s linear 0.5s infinite;
                    transform: translateX(-100%);
                    background: linear-gradient(90deg, transparent, var(--skeleton-wave, rgba(0, 0, 0, 0.1)), transparent);
                }
                @keyframes waves {
                    0% {
                        transform: translateX(-100%);
                    }
                    60% {
                        transform: translateX(100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
            </style>
            <div>
                ${spanes}
            </div>
        `;
    }

    disconnectedCallback() {
        console.log('Custom square element removed from page.');
    }
}

customElements.define('skeleton-box', SkeletonBox);

//export default SkeletonBox;