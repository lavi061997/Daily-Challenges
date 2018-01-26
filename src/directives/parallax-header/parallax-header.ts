import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[parallax-header]',
  host: {
    '(ionScroll)': 'onContentScroll($event)',
    '(window:resize)': 'onWindowResize($event)'
  }
})
export class ParallaxHeader {

    header: any;
    headerHeight: any;
    translateAmt: any;
    scaleAmt: any;

    constructor(public element: ElementRef, public renderer: Renderer){

    }

    ngOnInit(){

        let content = this.element.nativeElement.getElementsByClassName('scroll-content')[0];
        console.log(content);
        this.header = content.getElementsByClassName('header-image')[0];
        console.log(this.header);
        let mainContent = content.getElementsByClassName('main-content')[0];
        console.log(mainContent);
        this.headerHeight = this.header.clientHeight;

        this.renderer.setElementStyle(this.header, 'webkitTransformOrigin', 'center bottom');
        this.renderer.setElementStyle(this.header, 'background-size', 'cover');
        this.renderer.setElementStyle(mainContent, 'position', 'absolute');

    }

    onWindowResize(ev){
        this.headerHeight = this.header.clientHeight;
    }

    onContentScroll(ev){

        ev.domWrite(() => {
            this.updateParallaxHeader(ev);
        });

    }

    updateParallaxHeader(ev){

        if(ev.scrollTop >= 0){
            this.translateAmt = ev.scrollTop / 2;
            this.scaleAmt = 1;
        } else {
            this.translateAmt = 0;
            this.scaleAmt = -ev.scrollTop / this.headerHeight + 1;
        }

        this.renderer.setElementStyle(this.header, 'webkitTransform', 'translate3d(0,'+this.translateAmt+'px,0) scale('+this.scaleAmt+','+this.scaleAmt+')');

    }

}