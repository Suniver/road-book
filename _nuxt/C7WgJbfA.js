import{s as b,u as h}from"./q-IIQ9cr.js";import{X as w,t as a,v as s,x as i,Z as r,b2 as f,d as u,B as m,z as d,W as g,_ as k,a0 as v}from"./D2rE0m8h.js";var y=function(t){var e=t.dt;return`
.p-toggleswitch {
    display: inline-block;
    width: `.concat(e("toggleswitch.width"),`;
    height: `).concat(e("toggleswitch.height"),`;
}

.p-toggleswitch-input {
    cursor: pointer;
    appearance: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: 1;
    outline: 0 none;
    border-radius: `).concat(e("toggleswitch.border.radius"),`;
}

.p-toggleswitch-slider {
    display: inline-block;
    cursor: pointer;
    width: 100%;
    height: 100%;
    border-width: `).concat(e("toggleswitch.border.width"),`;
    border-style: solid;
    border-color: `).concat(e("toggleswitch.border.color"),`;
    background: `).concat(e("toggleswitch.background"),`;
    transition: background `).concat(e("toggleswitch.transition.duration"),", color ").concat(e("toggleswitch.transition.duration"),", border-color ").concat(e("toggleswitch.transition.duration"),", outline-color ").concat(e("toggleswitch.transition.duration"),", box-shadow ").concat(e("toggleswitch.transition.duration"),`;
    border-radius: `).concat(e("toggleswitch.border.radius"),`;
    outline-color: transparent;
    box-shadow: `).concat(e("toggleswitch.shadow"),`;
}

.p-toggleswitch-slider:before {
    position: absolute;
    content: "";
    top: 50%;
    background: `).concat(e("toggleswitch.handle.background"),`;
    width: `).concat(e("toggleswitch.handle.size"),`;
    height: `).concat(e("toggleswitch.handle.size"),`;
    left: `).concat(e("toggleswitch.gap"),`;
    margin-top: calc(-1 * calc(`).concat(e("toggleswitch.handle.size"),` / 2));
    border-radius: `).concat(e("toggleswitch.handle.border.radius"),`;
    transition: background `).concat(e("toggleswitch.transition.duration"),", left ").concat(e("toggleswitch.slide.duration"),`;
}

.p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider {
    background: `).concat(e("toggleswitch.checked.background"),`;
    border-color: `).concat(e("toggleswitch.checked.border.color"),`;
}

.p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider:before {
    background: `).concat(e("toggleswitch.handle.checked.background"),`;
    left: calc(`).concat(e("toggleswitch.width")," - calc(").concat(e("toggleswitch.handle.size")," + ").concat(e("toggleswitch.gap"),`));
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-slider {
    background: `).concat(e("toggleswitch.hover.background"),`;
    border-color: `).concat(e("toggleswitch.hover.border.color"),`;
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-slider:before {
    background: `).concat(e("toggleswitch.handle.hover.background"),`;
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-slider {
    background: `).concat(e("toggleswitch.checked.hover.background"),`;
    border-color: `).concat(e("toggleswitch.checked.hover.border.color"),`;
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-slider:before {
    background: `).concat(e("toggleswitch.handle.checked.hover.background"),`;
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:focus-visible) .p-toggleswitch-slider {
    box-shadow: `).concat(e("toggleswitch.focus.ring.shadow"),`;
    outline: `).concat(e("toggleswitch.focus.ring.width")," ").concat(e("toggleswitch.focus.ring.style")," ").concat(e("toggleswitch.focus.ring.color"),`;
    outline-offset: `).concat(e("toggleswitch.focus.ring.offset"),`;
}

.p-toggleswitch.p-invalid > .p-toggleswitch-slider {
    border-color: `).concat(e("toggleswitch.invalid.border.color"),`;
}

.p-toggleswitch.p-disabled {
    opacity: 1;
}

.p-toggleswitch.p-disabled .p-toggleswitch-slider {
    background: `).concat(e("toggleswitch.disabled.background"),`;
}

.p-toggleswitch.p-disabled .p-toggleswitch-slider:before {
    background: `).concat(e("toggleswitch.handle.disabled.background"),`;
}
`)},_={root:{position:"relative"}},S={root:function(t){var e=t.instance,c=t.props;return["p-toggleswitch p-component",{"p-toggleswitch-checked":e.checked,"p-disabled":c.disabled,"p-invalid":c.invalid}]},input:"p-toggleswitch-input",slider:"p-toggleswitch-slider"},x=w.extend({name:"toggleswitch",theme:y,classes:S,inlineStyles:_}),B={name:"BaseToggleSwitch",extends:b,props:{modelValue:{type:null,default:!1},trueValue:{type:null,default:!0},falseValue:{type:null,default:!1},invalid:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},tabindex:{type:Number,default:null},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:x,provide:function(){return{$pcToggleSwitch:this,$parentInstance:this}}},p={name:"ToggleSwitch",extends:B,inheritAttrs:!1,emits:["update:modelValue","change","focus","blur"],methods:{getPTOptions:function(t){var e=t==="root"?this.ptmi:this.ptm;return e(t,{context:{checked:this.checked,disabled:this.disabled}})},onChange:function(t){if(!this.disabled&&!this.readonly){var e=this.checked?this.falseValue:this.trueValue;this.$emit("update:modelValue",e),this.$emit("change",t)}},onFocus:function(t){this.$emit("focus",t)},onBlur:function(t){this.$emit("blur",t)}},computed:{checked:function(){return this.modelValue===this.trueValue}}},V=["data-p-checked","data-p-disabled"],T=["id","checked","tabindex","disabled","readonly","aria-checked","aria-labelledby","aria-label","aria-invalid"];function z(n,t,e,c,l,o){return a(),s("div",r({class:n.cx("root"),style:n.sx("root")},o.getPTOptions("root"),{"data-p-checked":o.checked,"data-p-disabled":n.disabled}),[i("input",r({id:n.inputId,type:"checkbox",role:"switch",class:[n.cx("input"),n.inputClass],style:n.inputStyle,checked:o.checked,tabindex:n.tabindex,disabled:n.disabled,readonly:n.readonly,"aria-checked":o.checked,"aria-labelledby":n.ariaLabelledby,"aria-label":n.ariaLabel,"aria-invalid":n.invalid||void 0,onFocus:t[0]||(t[0]=function(){return o.onFocus&&o.onFocus.apply(o,arguments)}),onBlur:t[1]||(t[1]=function(){return o.onBlur&&o.onBlur.apply(o,arguments)}),onChange:t[2]||(t[2]=function(){return o.onChange&&o.onChange.apply(o,arguments)})},o.getPTOptions("input")),null,16,T),i("span",r({class:n.cx("slider")},o.getPTOptions("slider")),null,16)],16,V)}p.render=z;const C=f("/icon.svg"),F={class:"flex justify-between items-center w-full h-full"},L=i("div",{class:"flex items-center gap-2"},[i("img",{src:C,style:{height:"30px"},alt:""}),i("h3",null,"Dustland Delivery - Road Book")],-1),O={class:"flex items-center gap-2"},N=u({__name:"header",setup(n){const t=h();return(e,c)=>{const l=p;return a(),s("div",F,[L,i("div",O,[m(" Show city names "),d(l,{modelValue:g(t).showLabels,"onUpdate:modelValue":c[0]||(c[0]=o=>g(t).showLabels=o)},null,8,["modelValue"])])])}}}),P={},$={class:"flex justify-center items-center w-full h-full"};function j(n,t){return a(),s("div",$," Dustland Delivery is the exclusive property of Neutron Star Studio and Farlight Games. The developer of this application holds no rights and is in no way affiliated with Neutron Star Studio or Farlight Games. ")}const D=k(P,[["render",j]]),I={class:"flex flex-col"},A={style:{height:"5vh"},class:"p-2 bg-stone-200 border-0 border-b-1 border-dark-200 border-solid shadow-lg z-500"},G={style:{height:"90vh"}},R={style:{height:"5vh"},class:"p-2 bg-stone-200 border-0 border-t-1 border-dark-200 border-solid z-500"},H=u({__name:"default",setup(n){return h(),(t,e)=>{const c=N,l=D;return a(),s("div",I,[i("div",A,[d(c)]),i("div",G,[v(t.$slots,"default")]),i("div",R,[d(l)])])}}});export{H as default};
