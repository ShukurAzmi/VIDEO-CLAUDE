const SEGS=[[5.25, 12.98], [13.14, 13.57], [13.89, 15.78], [15.86, 26.24], [26.63, 34.0]],OFFS=[0, 7.596666666666667, 7.893333333333333, 9.649999999999999, 19.896666666666665],DUR=27.266666666666666;
function fromSrc(x,S,O){let b=null;for(let i=0;i<S.length;i++){if(x<S[i][0])return b===null?O[i]:b;if(x<=S[i][1])return O[i]+x-S[i][0];b=O[i]+S[i][1]-S[i][0]}return b}
