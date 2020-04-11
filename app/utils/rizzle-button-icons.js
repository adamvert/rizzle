import React from 'react'
import Svg, {Circle, G, Path, Polygon, Rect} from 'react-native-svg'
import { fontSizeMultiplier } from '../utils'

export function getRizzleButtonIcon (iconName, borderColor, backgroundColor, isEnabled) {
  switch (iconName) {
    case 'toggleViewButtonsIcon':
      return <Svg
        height='40'
        width='40'
        style={{
          left: 13,
          top: 13
        }}>
        <Path
          d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'
          strokeWidth={2}
          stroke={borderColor}
          fill='none'
        />
        <Circle
          cx='12'
          cy='12'
          r='3'
          strokeWidth={2}
          stroke={borderColor}
          fill='none'
        />
      </Svg>

    case 'showShareSheetIcon':
      return <Svg
        height='32'
        width='32'
        style={{
          position: 'absolute',
          left: 14,
          top: 7
        }}>
        <Path stroke={borderColor} strokeWidth={2} fill='none' transform='translate(1, 0)' d='M5,12 C4.71689466,12 4.34958605,12 4,12 C-4.54747351e-13,12 -4.54747351e-13,12.5662107 -4.54747351e-13,16 C-4.54747351e-13,20 -4.54747351e-13,22 -4.54747351e-13,26 C-4.54747351e-13,30 -4.54747351e-13,30 4,30 C8,30 10,30 14,30 C18,30 18,30 18,26 C18,22 18,24 18,17 C18,12 17.9526288,12.0459865 14,12 C13.4028116,11.9930521 13.7719806,12 13,12'/>
        <Path stroke={borderColor} strokeWidth={2} d='M10,18.25 L10,1' strokeLinecap='round'/>
        <Path stroke={borderColor} strokeWidth={2} d='M10,1 L16,7' strokeLinecap='round'/>
        <Path stroke={borderColor} strokeWidth={2} d='M10,1 L4,7' strokeLinecap='round'/>
      </Svg>

    case 'saveButtonIconOff':
      return <Svg
        width='35px'
        height='34px'
        viewBox='0 0 37 34'
        strokeWidth='2'
        stroke={borderColor}
        fill='none'
        style={{
          left: 6,
          top: 6
        }}>
        <Path d='M19.3058823,10 L23.3013283,2.88768776 C23.5718232,2.40617867 24.1814428,2.2351178 24.6629519,2.50561262 C24.6681837,2.50855168 24.673389,2.51153779 24.6785671,2.51457056 L30.2152447,5.75736369 C30.689889,6.03535949 30.850899,6.64450404 30.5756101,7.12072339 L26.5410884,14.1' />
        <Path d='M19.3058823,26.548712 L15.2922426,33.6568385 C15.0206918,34.1377529 14.4106983,34.3074756 13.9297839,34.0359249 C13.9294556,34.0357395 13.9291274,34.035554 13.9287993,34.0353682 L8.38060649,30.8942713 C7.89999957,30.6221768 7.73096688,30.0119917 8.0030614,29.5313848 C8.00649499,29.52532 8.00999188,29.5192912 8.01355151,29.5132995 L12.2173038,22.4373696' />
        <Path d='M16.8,22.4373696 L3.8,22.4373696 C3.24771525,22.4373696 2.8,21.9896544 2.8,21.4373696 L2.8,15.1 C2.8,14.5477153 3.24771525,14.1 3.8,14.1 L11.8,14.1' />
        <Path d='M26.5066683,22.4373696 L34.8,22.4373696 C35.3522847,22.4373696 35.8,21.9896544 35.8,21.4373696 L35.8,15.1 C35.8,14.5477153 35.3522847,14.1 34.8,14.1 L21.8,14.1' />
        <Path d='M15.4670718,3.31922035 L30.365307,29.1237209 C30.7795206,29.8411598 30.5337079,30.7585454 29.8162689,31.172759 L25.1937311,33.8415825 C24.4762921,34.255796 23.5589065,34.0099833 23.144693,33.2925444 L8.24645763,7.48804388 C7.83224406,6.77060495 8.07805679,5.85321933 8.79549574,5.43900578 L13.4180337,2.77018224 C14.1354727,2.35596868 15.0528583,2.60178142 15.4670718,3.31922035 Z' />
      </Svg>

    case 'saveButtonIconOn':
      return <Svg
        width='42px'
        height='39px'
        viewBox='0 0 42 39'
        strokeWidth='1'
        stroke={backgroundColor}
        fill={borderColor}
        style={{
          left: 5,
          top: 6
        }}>
          <Path d='M16.9091367,3.78663033 L32.7855762,30.8423987 C33.2269867,31.5946265 32.9650341,32.5564964 32.2004888,32.9907953 L27.2744394,35.7890308 C26.5098941,36.2233297 25.5322738,35.9655974 25.0908634,35.2133697 L9.21442378,8.15760134 C8.77301333,7.40537359 9.0349659,6.44350367 9.79951122,6.00920478 L14.7255607,3.2109692 C15.4901061,2.7766703 16.4677264,3.03440257 16.9091367,3.78663033 Z' id='Path-Copy-2' transform='translate(21.000000, 19.500000) rotate(60.000000) translate(-21.000000, -19.500000) ' />
          <Path d='M16.9091367,3.78663033 L32.7855762,30.8423987 C33.2269867,31.5946265 32.9650341,32.5564964 32.2004888,32.9907953 L27.2744394,35.7890308 C26.5098941,36.2233297 25.5322738,35.9655974 25.0908634,35.2133697 L9.21442378,8.15760134 C8.77301333,7.40537359 9.0349659,6.44350367 9.79951122,6.00920478 L14.7255607,3.2109692 C15.4901061,2.7766703 16.4677264,3.03440257 16.9091367,3.78663033 Z' id='Path' transform='translate(21.000000, 19.500000) rotate(-60.000000) translate(-21.000000, -19.500000) ' />
          <Path d='M16.9091367,3.78663033 L32.7855762,30.8423987 C33.2269867,31.5946265 32.9650341,32.5564964 32.2004888,32.9907953 L27.2744394,35.7890308 C26.5098941,36.2233297 25.5322738,35.9655974 25.0908634,35.2133697 L9.21442378,8.15760134 C8.77301333,7.40537359 9.0349659,6.44350367 9.79951122,6.00920478 L14.7255607,3.2109692 C15.4901061,2.7766703 16.4677264,3.03440257 16.9091367,3.78663033 Z' id='Path-Copy' />
      </Svg>

    case 'launchBrowserIcon':
      return <Svg
        height='32'
        width='32'
        viewBox='0 0 24 24'
        fill='none'
        stroke={borderColor}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        style={{
          position: 'absolute',
          left: 8,
          top: 8
        }}>
        <Circle cx='12' cy='12' r='11' />
        <Polygon
          points='16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76'
          fill={borderColor} />
        <Circle cx='12' cy='12' r='2'
          fill={backgroundColor} />
      </Svg>

    case 'showMercuryIconOff':
      return <Svg
        style={{
          position: 'absolute',
          left: 9,
          top: 9,
          opacity: isEnabled ? 1 : 0.3
        }}
        height='34'
        width='34'>
        <Rect stroke={borderColor} strokeWidth='2' opacity='0.5' fill='none' x='16' y='4' width='14' height='24' rx='2'></Rect>
        <Path stroke={borderColor} d='M17,8 L27,8' opacity='0.5' strokeLinecap='square' />
        <Path stroke={borderColor} d='M17,12 L27,12' opacity='0.5' strokeLinecap='square' />
        <Path stroke={borderColor} d='M17,14 L27,14' opacity='0.5' strokeLinecap='square' />
        <Path stroke={borderColor} d='M17,10 L27,10' opacity='0.5' strokeLinecap='square' />
        <Path stroke={borderColor} d='M17,16 L27,16' opacity='0.5' strokeLinecap='square' />
        <Path stroke={borderColor} d='M17,18 L27,18' opacity='0.5' strokeLinecap='square' />
        <Path stroke={borderColor} d='M17,20 L27,20' opacity='0.5' strokeLinecap='square' />
        <Path stroke={borderColor} d='M17,22 L27,22' opacity='0.5' strokeLinecap='square' />
        <Path stroke={borderColor} d='M17,24 L27,24' opacity='0.5' strokeLinecap='square' />
        <Rect stroke={borderColor} strokeWidth='2' fill={backgroundColor} x='2' y='1' width='16' height='29' rx='2'></Rect>
        <Path stroke={borderColor} d='M6,9 L14,9' strokeLinecap='square' />
        <Path stroke={borderColor} d='M6,11 L14,11' strokeLinecap='square' />
      </Svg>

    case 'showMercuryIconOn':
      return <Svg
        style={{
          position: 'absolute',
          left: 12,
          top: 10,
          opacity: isEnabled ? 1 : 0.3
        }}
        height='34'
        width='34'
      >
        <Rect stroke={borderColor} strokeWidth='2' fill={backgroundColor} opacity='0.5' x='14' y='2' width='14' height='25' rx='2' />
        <Path stroke={borderColor} d='M17,19 L25,19' opacity='0.5' strokeLinecap='square' />
        <Path stroke={borderColor} d='M17,21 L25,21' opacity='0.5' strokeLinecap='square' />
        <Rect stroke={borderColor} strokeWidth='2' fill={backgroundColor} x='1' y='1' width='16' height='29' rx='2' />
        <Path stroke={borderColor} d='M4,7 L14,7' strokeLinecap='square' />
        <Path stroke={borderColor} d='M4,9 L14,9' strokeLinecap='square' />
        <Path stroke={borderColor} d='M4,11 L14,11' strokeLinecap='square' />
        <Path stroke={borderColor} d='M4,13 L14,13' strokeLinecap='square' />
        <Path stroke={borderColor} d='M4,15 L14,15' strokeLinecap='square' />
        <Path stroke={borderColor} d='M4,17 L14,17' strokeLinecap='square' />
        <Path stroke={borderColor} d='M4,19 L14,19' strokeLinecap='square' />
        <Path stroke={borderColor} d='M4,21 L14,21' strokeLinecap='square' />
        <Path stroke={borderColor} d='M4,23 L14,23' strokeLinecap='square' />
        <Path stroke={borderColor} d='M4,25 L14,25' strokeLinecap='square' />
      </Svg>

    case 'feedbin':
      return <Svg
        height={ 26 *  fontSizeMultiplier()}
        width={ 26 *  fontSizeMultiplier()}
        viewBox='0 0 120 120'
        style={{
          top: 0
        }}
      >
        <Path fill={backgroundColor} d='M116.4,87.2c-22.5-0.1-96.9-0.1-112.4,0c-4.9,0-4.8-22.5,0-23.3c15.6-2.5,60.3,0,60.3,0s16.1,16.3,20.8,16.3 c4.8,0,16.1-16.3,16.1-16.3s12.8-2.3,15.2,0C120.3,67.9,121.2,87.3,116.4,87.2z'/>
        <Path fill={backgroundColor} d='M110.9,108.8L110.9,108.8c-19.1,2.5-83.6,1.9-103,0c-4.3-0.4-1.5-13.6-1.5-13.6h108.1 C114.4,95.2,116.3,108.1,110.9,108.8z'/>
        <Path fill={backgroundColor} d='M58.1,9.9C30.6,6.2,7.9,29.1,7.9,51.3l102.6,1C110.6,30.2,85.4,13.6,58.1,9.9z'/>
      </Svg>

    case 'feedly':
      return <Svg 
        width={28 * fontSizeMultiplier()} 
        height={28 * fontSizeMultiplier()} 
        viewBox='0 0 28 28'
      >
        <Path fill={backgroundColor} d='M16.0336326,3.33375996 C14.9218819,2.22208001 13.102885,2.22208001 11.9910636,3.33375996 L1.83375996,13.4912051 C0.722080014,14.6029557 0.722080014,16.4220233 1.83375996,17.5339154 L9.08174345,24.7818989 C9.58645464,25.2216207 10.246108,25.4880845 10.9680635,25.4880845 L17.0569863,25.4880845 C17.8504372,25.4880845 18.5687154,25.166461 19.0885602,24.6467577 L26.19624,17.5388656 C27.30792,16.4271857 27.30792,14.6080474 26.19624,13.4964382 L16.0336326,3.33375996 L16.0336326,3.33375996 Z M15.7506917,21.8854494 L14.7364605,22.8994683 C14.6624899,22.9737218 14.5600202,23.0196175 14.4468721,23.0196175 L13.578107,23.0196175 C13.47493,23.0196175 13.3810879,22.9815007 13.3088145,22.9187742 L12.2749946,21.8846714 C12.116163,21.7261934 12.116163,21.4665186 12.2749946,21.3080406 L13.7239973,19.8587549 C13.8826875,19.7003476 14.1423623,19.7003476 14.3006282,19.8587549 L15.7506917,21.308677 C15.9093818,21.4672964 15.9093818,21.7268299 15.7506917,21.8854494 L15.7506917,21.8854494 Z M15.7506917,15.8061442 L11.6967372,19.8598865 C11.6227666,19.9341399 11.5201554,19.9798235 11.4070073,19.9799649 L10.5382422,19.9799649 C10.4354896,19.9799649 10.3413645,19.9418482 10.2693741,19.879051 L9.23505911,18.8451603 C9.07658108,18.6863995 9.07658108,18.4268661 9.23505911,18.2683172 L13.7239973,13.7795205 C13.8826875,13.6207596 14.1423623,13.6207596 14.3009818,13.7795205 L15.7506917,15.2294425 C15.9093818,15.388062 15.9093818,15.6475954 15.7506917,15.8061442 L15.7506917,15.8061442 Z M15.7506917,9.72641465 L8.65687239,16.8198803 C8.58290184,16.8941337 8.48036139,16.9399587 8.36728402,16.9399587 L7.49851887,16.9399587 C7.39555411,16.9399587 7.30142905,16.9020541 7.22965073,16.8392569 L6.1953358,15.8051541 C6.03671632,15.6467468 6.03671632,15.3870012 6.1953358,15.2284525 L13.7239973,7.69986172 C13.8826875,7.54124225 14.1421502,7.54124225 14.3006282,7.69986172 L15.7506917,9.14978371 C15.9093818,9.30840318 15.9093818,9.56779517 15.7506917,9.72641465 L15.7506917,9.72641465 Z' />
      </Svg>

    case 'rizzle':
      return <Svg
        width={28 * fontSizeMultiplier()}
        height={28 * fontSizeMultiplier()}
        viewBox='0 0 37 36'
        strokeWidth='2'
        stroke={backgroundColor}
        fill='none'
        >
        <Path transform='translate(-1, 0)' d='M19.3058823,10 L23.3013283,2.88768776 C23.5718232,2.40617867 24.1814428,2.2351178 24.6629519,2.50561262 C24.6681837,2.50855168 24.673389,2.51153779 24.6785671,2.51457056 L30.2152447,5.75736369 C30.689889,6.03535949 30.850899,6.64450404 30.5756101,7.12072339 L26.5410884,14.1' />
        <Path transform='translate(-1, 0)' d='M19.3058823,26.548712 L15.2922426,33.6568385 C15.0206918,34.1377529 14.4106983,34.3074756 13.9297839,34.0359249 C13.9294556,34.0357395 13.9291274,34.035554 13.9287993,34.0353682 L8.38060649,30.8942713 C7.89999957,30.6221768 7.73096688,30.0119917 8.0030614,29.5313848 C8.00649499,29.52532 8.00999188,29.5192912 8.01355151,29.5132995 L12.2173038,22.4373696' />
        <Path transform='translate(-1, 0)' d='M16.8,22.4373696 L3.8,22.4373696 C3.24771525,22.4373696 2.8,21.9896544 2.8,21.4373696 L2.8,15.1 C2.8,14.5477153 3.24771525,14.1 3.8,14.1 L11.8,14.1' />
        <Path transform='translate(-1, 0)' d='M26.5066683,22.4373696 L34.8,22.4373696 C35.3522847,22.4373696 35.8,21.9896544 35.8,21.4373696 L35.8,15.1 C35.8,14.5477153 35.3522847,14.1 34.8,14.1 L21.8,14.1' />
        <Path transform='translate(-1, 0)' d='M15.4670718,3.31922035 L30.365307,29.1237209 C30.7795206,29.8411598 30.5337079,30.7585454 29.8162689,31.172759 L25.1937311,33.8415825 C24.4762921,34.255796 23.5589065,34.0099833 23.144693,33.2925444 L8.24645763,7.48804388 C7.83224406,6.77060495 8.07805679,5.85321933 8.79549574,5.43900578 L13.4180337,2.77018224 C14.1354727,2.35596868 15.0528583,2.60178142 15.4670718,3.31922035 Z' />
      </Svg>

    case 'saved':
      return <Svg width="32px" height="32px" viewBox="0 0 32 32">
        <G strokeWidth="1"  stroke='none' fill="none" fillRule="evenodd">
          <G transform="translate(-1.000000, -3.000000)">
            <G transform="translate(1.000000, 3.000000)">
              <Path fill={borderColor} opacity={0.9} d="M2,6 L2,27 C2,28.65 3.4,30 5.11111111,30 L26.8888889,30 C28.6071081,30 30,28.6568542 30,27 L30,6 M0,5 C0,5.00566956 0,4.33900289 0,3 C0,0.991495663 0.444444444,4.4408921e-15 3,4.4408921e-15 L29,4.4408921e-15 C31.5555556,4.4408921e-15 32,1 32,3 L32,5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <Rect stroke={backgroundColor} fill={borderColor} transform="translate(16.000000, 17.500000) rotate(120.000000) translate(-16.000000, -17.500000) " x="7.5" y="15.5" width="17" height="4" />
              <Rect stroke={backgroundColor} fill={borderColor} x="7.5" y="15.5" width="17" height="4" />
              <Rect stroke={backgroundColor} fill={borderColor} transform="translate(16.000000, 17.500000) rotate(60.000000) translate(-16.000000, -17.500000) " x="7.5" y="15.5" width="17" height="4" />
            </G>
          </G>
        </G>
      </Svg>

    case 'unread':
      return <Svg width="30px" height="26px" viewBox="0 0 30 26">
        <G stroke="none" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <G transform="translate(-2.000000, -8.000000)" strokeWidth="2">
            <G transform="translate(3.000000, 3.000000)">
              <Path stroke={borderColor} strokeWidth="3" d="M0,22 L0,27 C0,28.65 1.4,30 3.11111111,30 L24.8888889,30 C26.6071081,30 28,28.6568542 28,27 L28,22" />
              <Path strokeOpacity="0.7" stroke={borderColor} strokeWidth="1" d="M3,24 L25,24 M3,27 L25,27 M3,18 L25,18 M3,21 L25,21 M3,12 L25,12 M3,15 L25,15 M3,6 L25,6 M3,9 L25,9" />
            </G>
          </G>
        </G>
      </Svg>

    case 'rss':
      return <Svg width="32" height="32" viewBox="0 0 24 24" fill='none' stroke={borderColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M4 11a9 9 0 0 1 9 9" />
        <Path d="M4 4a16 16 0 0 1 16 16" />
        <Circle cx="5" cy="19" r="1" />
      </Svg>

    case'back':
      return <Svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={borderColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M15 18l-6-6 6-6"/>
      </Svg>

    case 'forward':
      return <Svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={borderColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M9 18l6-6-6-6"/>
      </Svg>
}
}
