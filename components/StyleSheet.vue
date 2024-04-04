<template>
    <div class="">
      
    </div>
</template>

<script>


    export default{
      
    }
</script>

<style >
    body
    {
        font-family: 'Dosis', sans-serif;
        font-size: 15px;
    }
    .boite *
    {
        pointer-events: none;
    }
    .boite.active
    {
        background-color: red;
    }
    .boite:not(.active) .hiddenBox, .boite.active .visibleBox
    {
        display: none;
    }
    .border-b-2 
    {
        border-color: #ffffff50;
        border-bottom-width: 1Px;
    }
    table
    {
        position: relative;
        z-index: 1;
        background: rgba(255, 255, 255, 0.25);
        border-radius: 16px 16px 0 0;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        color: #fff;
        font-family: 'Dosis', sans-serif;
    }
    table.hideElements tbody tr:not(:first-child,:last-child)
    {
        display: none;
    }
    td
    {
        padding: 15px 20px;
        border: 1px solid #ffffff12;
        transition: all 0.4s;
    }
    .baseWidth input
    {
        min-width: 200px;
        text-align: left;
    }
    th,td
    {
        position: relative;
    }
    th:not(:first-child), td.currency,td.heures
    {
        max-width: 100px;
    }
    .maxSize
    {
        max-width: 170px;
    }
    th.currency,th.heures
    {
        padding-right: 20px;
    }
    td.nopad,div.nopad
    {
        padding: 0;
    }
    td input
    {
        padding: 20px;
        text-align: right;
    }
    .currency::after,.heures::after,.nbjeux::after
    {
        content: "€";
        position: absolute;
        top: 0;
        left: initial;
        right: 10px;
        height: 100%;
        display: grid;
        align-items: center;
    }
    .heures::after
    {
        content: "h";
    }
    .nbjeux
    {
        text-align: center!important;
    }
    .nbjeux::after
    {
        content: "jeux";
        right: 10Px;
    }
    tr:last-child>td
    {
        border-bottom: none;
    }
    td:first-child
    {
        border-left: none;
    }
    td:last-child
    {
        border-right: none;
    }
    td:not(:first-child,.text-center,.text-left),th:not(:first-child,.text-center,.text-left)
    {
        text-align: right;
    }
    td:hover,td p:hover
    {
        background: #ffffff12;
    }
    td p
    {
        transition: all 0.5s;
    }
    th
    {
        text-transform: uppercase;
        letter-spacing: 2Px;
        font-size: 10Px;
        padding: 10px;
    }
    .draghandle
    {
        position: relative;
    }
    .draghandle::before
    {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url(../assets/move.svg);
        background-size: 30px;
        background-repeat: no-repeat;
        background-position: center;
        opacity: 0.1;
        transition: all 0.4s;
    }
    .draghandle:hover::before
    {
        opacity: 0.3;
    }
    tfoot
    {
        width: 100%;
    }
    textarea
    {
        font-size: 2em;
        text-align: center;
        display: grid;
        justify-items: center;
        margin: 0 auto;
        width: 100%;
        /* Désactive le soulignement des erreurs */
        text-decoration: none !important;
        outline: none;
        resize: none;
        height: 60Px!important;
    }
    .smallTextArea
    {
        font-size: 1em;
        height: 25px!important;
    }
    tfoot td:not(:first-child,.ratio)
    {
        text-align: center;
    }
    .selectableTable *,.deleteTable
    {
        cursor: pointer;
    }
    .selectableTable input
    {
        cursor: initial;
    }
    .triableTable
    {
        margin-top: 100Px;
    }
    .triableTable tbody>tr
    {
        display: contents;
    }
    input,select,textarea
    {
        background: #fff0;  
        outline: none!important; 
        -webkit-box-shadow: none!important;
        box-shadow: none!important;
    }
    select,select:focus
    {
        padding: 10px;
    }
    option
    {
        color: #010f1e!important;
    }
    .space
    {
        height: 300px;
    }
    .total td input
    {
        text-align: right;
    }

    .noborder
    {
        border: none!important;
        border-color: #fff0!important;
    }
    /* ----------- */
    .absBundle
    {
        position: absolute;
        bottom: 0;
        left: 0px;
        transform: rotate(-90deg);
        transform-origin: bottom left;
        padding: 20px 40px;
        transition: all 0.4s;
    }
    .absBundle.inverse
    {
        left: initial;
        right: 0;
        transform-origin: bottom right;
        transform: rotate(90deg);
    }
    .absBundle:hover
    {
        background: #111;
        color: #fff;
    }
    body::before
    {
        content : "";
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: url(../assets/background.jpg);
        filter: brightness(0.095);
        z-index: -1;
    }
    /* ----checkboxTableauCalculator ---- */
    .posfix
    {
        position: fixed;
    }
    .checkboxTableauCalculator
    {
        top: 50%;
        left: initial;
        right: 0;
        transform: translateY(-50%);
        max-width: 300px;
        z-index: 100;
    }
    .checkboxTableauCalculator .wrapChoix
    {
        gap: 20Px;
        overflow-y: scroll;
        max-height: 100vh;
    }
    .wrapChoix::-webkit-scrollbar
    {
        width: 1Px;
    }
    .affichageWrapChoix
    {
        white-space: nowrap;
    }
    /* ----checkboxStyle ---- */
    .checkbox-wrapper label
    {
        display: grid;
        grid-template-columns: 40px 1fr;
        align-items: center;
        justify-items: start;
    }
    .checkbox-wrapper .cbx {
        -webkit-user-select: none;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        cursor: pointer;
      }
      .checkbox-wrapper .cbx span {
        display: inline-block;
        vertical-align: middle;
        transform: translate3d(0, 0, 0);
      }
      .checkbox-wrapper .cbx span:first-child {
        position: relative;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        transform: scale(1);
        vertical-align: middle;
        border: 1px solid #B9B8C3;
        transition: all 0.2s ease;
      }
      .checkbox-wrapper .cbx span:first-child svg {
        position: absolute;
        z-index: 1;
        top: 8px;
        left: 6px;
        fill: none;
        stroke: white;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 16px;
        stroke-dashoffset: 16px;
        transition: all 0.3s ease;
        transition-delay: 0.1s;
        transform: translate3d(0, 0, 0);
      }
      .checkbox-wrapper .cbx span:first-child:before {
        content: "";
        width: 100%;
        height: 100%;
        background: #506EEC;
        display: block;
        transform: scale(0);
        opacity: 1;
        border-radius: 50%;
        transition-delay: 0.2s;
      }
      .checkbox-wrapper .cbx span:last-child {
        margin-left: 8px;
      }
      .checkbox-wrapper .cbx span:last-child:after {
        content: "";
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        height: 1px;
        width: 100%;
        background: #B9B8C3;
        transform-origin: 0 0;
        transform: scaleX(0);
      }
      .checkbox-wrapper .cbx:hover span:first-child {
        border-color: #3c53c7;
      }
    
      .checkbox-wrapper .inp-cbx:checked + .cbx span:first-child {
        border-color: #3c53c7;
        background: #3c53c7;
        animation: check-15 0.6s ease;
      }
      .checkbox-wrapper .inp-cbx:checked + .cbx span:first-child svg {
        stroke-dashoffset: 0;
      }
      .checkbox-wrapper .inp-cbx:checked + .cbx span:first-child:before {
        transform: scale(2.2);
        opacity: 0;
        transition: all 0.6s ease;
      }
      .checkbox-wrapper .inp-cbx:not(:checked) + .cbx span:last-child {
        color: #B9B8C3;
        transition: all 0.3s ease;
      }
      .checkbox-wrapper .inp-cbx:not(:checked) + .cbx span:last-child:after {
        transform: scaleX(1);
        transition: all 0.3s ease;
      }
    
      @keyframes check-15 {
        50% {
          transform: scale(1.2);
        }
      }
    
    /* ----RECHERCHE ---- */
    .inputGap
    {
        padding: 0 20px;
    }
    /* ----STATUT ET COULEUR ---- */
    .statut
    {
        position: relative;
    }
    .statut::before
    {
        content: "";
        opacity: 0.3;
        position:absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        transition: all 0.4s;
        z-index: -1;
    }
    .statut:hover::before
    {
        opacity: 0.6;
    } 
    .keep
    {
        border-bottom: 1Px solid #2f666a!important;
    }
    .green
    {
        border-bottom: 1Px solid #1e8847!important;
    }
     .orange
    {
        border-bottom: 1Px solid orange!important;
    }
    .trade,.red
    {
        border-bottom: 1Px solid #f00!important;
    }
    .traded
    {
        border-bottom:  1Px solid #3c4b56!important;
    }
    .platine
    {
        border-bottom:  1Px solid #af8303!important;
    }
    .platine::before
    {
        background: #463400!important;
    }
    .traded::before,.traded .statut::before
    {
        background: #010f1e!important;
    }
   .trade::before,.trade .statut::before
    {
        background: #700f0f!important;
    }
    .keep::before,.keep .statut::before
    {
        background: #214c4c;
    }
    .highlight
    {
        border-left:3px solid #af8303;
    }
    
    /* STATS */
    .bar-chart {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        position: relative;
        height: 200px;
        max-width: 1000Px;
        padding-bottom: 0;
        padding-top: 0;
        margin-top: 70px;
        background: #ffffff22;
    }
    .bar-chart h2
    {
        background: #fff0!important;
    }
    .bar {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 30px; /* Largeur des barres */
        position: relative;
    }

    .bar-inner {
        width: 100%;
        min-height: 25px;
    }

    .bar span {
        margin-top: 5px;
        position: absolute;
        bottom: -30px;
        left: 50%;
        transform:translateX(-50%);
    }
    .barlines,.barlines>*
    {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
    .barlines>*
    {
        height: 25%;
        border-top: 1Px solid #fff;
        opacity: 0.2;
    }
    .barlines>*:nth-child(2){top: 25%;}
    .barlines>*:nth-child(3){top: 50%;}
    .barlines>*:nth-child(4){top: 75%;}
    .barlines>*:nth-child(5){top: 100%;}

</style>