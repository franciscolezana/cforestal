import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { GetDataService } from 'src/app/services/get-data.service';
import { CalModalPage } from '../cal-modal/cal-modal.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  //Declaraciones
  actividades: any = [];

  idRegistro: number = 0;
  dia: number = 0;
  mes: number = 0;
  anio: number = 0;
  nombreFaseLunar: string = "";
  nombreEpoca: string = "";
  nombreTiempo: string = "";
  nombreCicloArbol: string = "";
  nombreCambio: string = "";
  nombreCuatrimestre: string = "";

  //Actividades Primarias
  act1: number = 0;
  act2: number = 0;
  act3: number = 0;
  act4: number = 0;
  act5: number = 0;
  act6: number = 0;
  //AÑO 1
  act7: number = 0;
  act8: number = 0;
  act9: number = 0;
  act10: number = 0;
  //AÑO 2
  act11: number = 0;
  // OTRAS ACTIVIDADES DE CICLO Y CUIDADOS CULTURALES
  act12: number = 0;
  act13: number = 0;
  act14: number = 0;
  act15: number = 0;
  act16: number = 0;
  //ACTIVIDADES SILVICULTURALES
  act17: number = 0;
  act18: number = 0;
  act19: number = 0;
  act20: number = 0;
  //APROVECHAMIENTO
  act21: number = 0;
  //CANICULA
  act22: number = 0;
  act23: number = 0;


  //------------------Calendar Components--------------------
  eventSource = [];
  lunasSource = [];
  eventosDia = [];
  viewTitle: string;
  diaSelected: string;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
    locale: 'es-GT',
    allDayLabel: 'All day',
    noEventsLabel: 'No hay actividades',
    showEventDetail: false
  };

  selectedDate: Date;

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private getService: GetDataService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.getActividades();
  }

  open(actividad) {
    console.log(actividad);
    this.openCalModal(actividad);
  }

  //-------------------------Métodos de Calendario

  // Cambiar Mes Actual
  next() {
    this.myCal.slideNext();
  }

  back() {
    this.myCal.slidePrev();
  }

  // Cambiar Título 
  onViewTitleChanged(title) {
    this.viewTitle = title.toUpperCase();
  }

  //Mostrar Evento
  onEventSelected = (event) => {
    //console.log(event);
    this.openCalModal(event);
  };

  //Get Eventos
  onCurrentChanged = (ev: Date) => {
    this.eventosDia = [];
    //console.log('ACTIVIDADES PARA LA FECHA: ' + ev);
    let stringDate = ev.toISOString();
    let isoFecha = stringDate.substring(0, 10);
    this.diaSelected = isoFecha.substring(8, 10)+'/'+isoFecha.substring(5, 7)+'/'+isoFecha.substring(0, 4);
    this.eventSource.forEach(element => {
      let fechaComparacion = new Date(element.startTime);
      if (fechaComparacion.toISOString() == ev.toISOString()) {
        this.eventosDia.push(element);
        //this.llenarActividades();
      }
    });
  };

  llenarActividades(){
    
  }

  //-------------------------Métodos de Logica
  //Obtener Actividades
  getActividades() {
    this.getService.getData()
      .subscribe(data => {
        this.actividades = data;
        this.crearLunas();
        this.crearEventos();
        //console.log(this.actividades);
      })
  }

  crearLunas() {
  }

  crearEventos() {
    //this.createRandomEvents();
    //console.log("Entro a eventos");
    var events = [];

    //Crear evento todo el día
    var date = new Date();
    var startDay;
    var endDay;
    var startTime;
    var endTime;
    var i = 0;

    this.actividades.forEach(element => {
      //console.log("elementoooo "+i)
      //console.log(element)
      i++;

      //Creando Fecha
      let dia = element.dia;
      //let diasiguiente = dia+1;
      let diastring: string = "";
      //let diastring2: string = "";
      let mes = element.mes;
      let messstring: string = "";
      let anio = element.anio;
      let aniostring: string = anio.toString();

      if (dia < 10) {
        diastring = "0" + dia.toString()
        //diastring2 = "0" + diasiguiente.toString()
      }
      else {
        diastring = dia.toString()
        //diastring2 = "0" + diasiguiente.toString()
      }

      if (mes < 10) {
        messstring = "0" + mes.toString()
      }
      else {
        messstring = mes.toString()
      }
      let fechainicio = aniostring + '-' + messstring + '-' + diastring + 'T12:00:00';
      //let fechafin = aniostring + '-' + messstring + '-' + diastring2 + 'T00:00:00';
      let fechaFormato = diastring + '/' + messstring + '/' + aniostring;

      let fechaEvento = new Date(fechainicio);
      let fechaEventoFin = new Date();
      fechaEventoFin.setDate(fechaEvento.getDate() + 0);

      //-------------------- ITERACIÓN DE ACTIVIDADES POR DIA

      if (element.act1 == 1) {
        events.push({
          title: "Colecta de Semillas",
          startTime: fechaEvento,
          endTime: fechaEvento,
          allDay: true,
          actividad: "Colecta de Semillas",
          tipoActividad: "Actividades Primarias",
          faselunar: element.nombreFaseLunar,
          descripcion: "La colecta de semillas debe realizarse en los meses de enero, febrero, marzo y diciembre, que es época de frío y calor. El árbol en ese tiempo se encuentra en ciclo masculino y la colecta de semilla se realiza en luna llena. El efecto de luna llena en la planta es cuando la savia y los nutrientes están en las ramas, las hojas y los frutos, el cual tiene efecto directo en la semilla",           
          fechaoptima: fechaFormato,
          nombreEpoca: element.nombreEpoca,
          nombreTiempo: element.nombreTiempo,
          nombreCicloArbol: element.nombreCicloArbol,
          nombreCambio: element.nombreCambio,
          nombreCuatrimestre: element.nombreCuatrimestre
        });
      }

      if (element.act2 == 1) {
        events.push({
          title: "Colecta de Material Vegetativo",
          startTime: fechaEvento,
          endTime: fechaEvento,
          allDay: true,
          actividad: "Colecta de Material Vegetativo",
          tipoActividad: "Actividades Primarias",
          faselunar: element.nombreFaseLunar,
          descripcion: "Las estacas pueden cortarse y recolectarse en los meses de enero, febrero, noviembre y diciembre, en el ciclo masculino del árbol, debido a que se debe esperar la cosecha de los frutos del árbol y antes que aparezcan las flores y hojas de la planta, en los meses específicos de noviembre y diciembre casi ningún árbol frutal está floreando y es época de viento y frío, ideal para realizar dicha actividad. ",
          fechaoptima: fechaFormato,
          nombreEpoca: element.nombreEpoca,
          nombreTiempo: element.nombreTiempo,
          nombreCicloArbol: element.nombreCicloArbol,
          nombreCambio: element.nombreCambio,
          nombreCuatrimestre: element.nombreCuatrimestre
        });
      }

      if (element.act3 == 1) {
        events.push({
          title: "Secado de Semillas ",
          startTime: fechaEvento,
          endTime: fechaEvento,
          allDay: true,
          actividad: "Secado de Semillas ",
          tipoActividad: "Actividades Primarias",
          faselunar: element.nombreFaseLunar,
          descripcion: "El secado de las semillas, debe de realizarse en los meses de enero, febrero, marzo, abril y diciembre, época de frío y calor. El árbol en ese tiempo se encuentra en ciclo masculino y el secado de las semillas se realiza en fase lunar de cuarto menguante. ",
          fechaoptima: fechaFormato,
          nombreEpoca: element.nombreEpoca,
          nombreTiempo: element.nombreTiempo,
          nombreCicloArbol: element.nombreCicloArbol,
          nombreCambio: element.nombreCambio,
          nombreCuatrimestre: element.nombreCuatrimestre
        });
      }

      if (element.act4 == 1) {
        events.push({
          title: "Siembra de Semillas ",
          startTime: fechaEvento,
          endTime: fechaEvento,
          allDay: true,
          actividad: "Siembra de Semillas ",
          tipoActividad: "Actividades Primarias",
          faselunar: element.nombreFaseLunar,
          descripcion: "La siembra de semillas, debe de realizarse en los meses de enero, febrero y diciembre, que es época de frío. El árbol en este tiempo se encuentra en ciclo masculino. La época de frío junto con la fase de luna llena, ayudan al buen porcentaje de germinación de la semilla. Regar o implementar un sistema de riego permite un buen porcentaje de germinación.",          fechaoptima: fechaFormato,
          nombreEpoca: element.nombreEpoca,
          nombreTiempo: element.nombreTiempo,
          nombreCicloArbol: element.nombreCicloArbol,
          nombreCambio: element.nombreCambio,
          nombreCuatrimestre: element.nombreCuatrimestre
        });
      }

      if (element.act5 == 1) {
        events.push({
          title: "Manejo de Germinación en Viveros",
          startTime: fechaEvento,
          endTime: fechaEvento,
          allDay: true,
          actividad: "Manejo de Germinación en Viveros",
          tipoActividad: "Actividades Primarias",
          faselunar: element.nombreFaseLunar,
          descripcion: "El manejo de germinación de semillas en viveros, (actividad que se desarrolla después de realizada la siembra directa de la semilla en la bolsa, bandeja u otro), dicha actividad forestal se realiza en los meses de enero, febrero, marzo, abril y mayo, época de frío y calor y en ciclo masculino y parte del ciclo femenino del árbol",
          fechaoptima: fechaFormato,
          nombreEpoca: element.nombreEpoca,
          nombreTiempo: element.nombreTiempo,
          nombreCicloArbol: element.nombreCicloArbol,
          nombreCambio: element.nombreCambio,
          nombreCuatrimestre: element.nombreCuatrimestre
        });
      }

      if (element.act6 == 1) {
        events.push({
          title: "Transplante; Semillero a Vivero",
          startTime: fechaEvento,
          endTime: fechaEvento,
          allDay: true,
          actividad: "Transplante; Semillero a Vivero",
          tipoActividad: "Actividades Primarias",
          faselunar: element.nombreFaseLunar,
          descripcion: "Posterior a las actividades de colecta y siembra de semillas, viene el trasplante, que consiste en trasladar la plántula del semillero a las bolsas, bandejas u otros contenedores en el vivero, esta acción debe realizarse en los meses de enero, febrero, octubre, noviembre y diciembre. En ese tiempo del año es época frío y viento. El árbol se encuentra en su ciclo masculino",
          fechaoptima: fechaFormato,
          nombreEpoca: element.nombreEpoca,
          nombreTiempo: element.nombreTiempo,
          nombreCicloArbol: element.nombreCicloArbol,
          nombreCambio: element.nombreCambio,
          nombreCuatrimestre: element.nombreCuatrimestre
        });
      }

      if (element.act7 == 1) {
        events.push({
          title: "Limpieza del Terreno Definitivo",
          startTime: fechaEvento,
          endTime: fechaEvento,
          allDay: true,
          actividad: "Limpieza del Terreno Definitivo",
          tipoActividad: "Año 1",
          faselunar: element.nombreFaseLunar,
          descripcion: "La actividad forestal de limpieza del terreno, se realiza en los meses de enero, febrero, marzo y abril, época de frío y calor. Las condiciones de la maleza en esta época, se encuentra desprovista de agua y sus nutrientes débiles, además con la luna de cuarto menguante los nutrientes en la planta van descendiendo y al cortar la maleza, con la raíz carente de nutrientes su regeneración natural es baja y tiende a morir.",          
          fechaoptima: fechaFormato,
          nombreEpoca: element.nombreEpoca,
          nombreTiempo: element.nombreTiempo,
          nombreCicloArbol: element.nombreCicloArbol,
          nombreCambio: element.nombreCambio,
          nombreCuatrimestre: element.nombreCuatrimestre
        });
      }

      if (element.act8 == 1) {
        events.push({
          title: "Trazado y ahoyado",
          startTime: fechaEvento,
          endTime: fechaEvento,
          allDay: true,
          actividad: "Trazado y ahoyado",
          tipoActividad: "Año 1",
          faselunar: element.nombreFaseLunar,
          descripcion: "El trazado y ahoyado es la actividad inmediata después de la limpieza del terreno, se realiza en los meses de marzo y abril, época de calor, ciclo masculino del árbol. El ahoyado debe estar listo cuando caen las primeras lluvias, época que ayuda a la plántula al momento del trasplante definitivo, así la raíz no esté desprovista de agua.",
          fechaoptima: fechaFormato,
          nombreEpoca: element.nombreEpoca,
          nombreTiempo: element.nombreTiempo,
          nombreCicloArbol: element.nombreCicloArbol,
          nombreCambio: element.nombreCambio,
          nombreCuatrimestre: element.nombreCuatrimestre
        });
      }

      if (element.act9 == 1) {
        events.push({
          title: "Reforestación, plantación o trasplante definitivo",
          startTime: fechaEvento,
          endTime: fechaEvento,
          allDay: true,
          actividad: "Reforestación, plantación o trasplante definitivo",
          tipoActividad: "Año 1",
          faselunar: element.nombreFaseLunar,
          descripcion: "El efecto de luna nueva y cuarto creciente en la actividad forestal de plantación, ayuda a  disminuir el sufrimiento de la plántula ante posibles accidentes por la manipulación de la raíz, tallo y ramas. En luna nueva la raíz está protegida por los nutrientes, en cuarto creciente los nutrientes van ascendiendo, protegiendo al tallo y las ramas. La combinación de luna nueva, cuarto creciente y la lluvia, son los mejores aliados para la plantación de los árboles y el trasplante definitivo, alcanzando un porcentaje alto de prendimiento.",
          fechaoptima: fechaFormato,
          nombreEpoca: element.nombreEpoca,
          nombreTiempo: element.nombreTiempo,
          nombreCicloArbol: element.nombreCicloArbol,
          nombreCambio: element.nombreCambio,
          nombreCuatrimestre: element.nombreCuatrimestre
        });
      }

      if (element.act10 == 1) {
        events.push({
          title: "Plateo en plantación",
          startTime: fechaEvento,
          endTime: fechaEvento,
          allDay: true,
          actividad: "Plateo en plantación",
          tipoActividad: "Año 1",
          faselunar: element.nombreFaseLunar,
          descripcion: "El plateo es una acción que debe practicarse después de la plantación definitiva y durante todo el año para el buen crecimiento y desarrollo de la planta. El plateo es hacer un circulo de 75 centímetros alrededor de la planta, si la maleza es muy agresiva o abundante en la zona, el plateo puede ser más amplia",
          fechaoptima: fechaFormato,
          nombreEpoca: element.nombreEpoca,
          nombreTiempo: element.nombreTiempo,
          nombreCicloArbol: element.nombreCicloArbol,
          nombreCambio: element.nombreCambio,
          nombreCuatrimestre: element.nombreCuatrimestre
        });
      }

      if (element.act11 == 1) {
        events.push({
          title: "Replante por bajo prendimiento",
          startTime: fechaEvento,
          endTime: fechaEvento,
          allDay: true,
          actividad: "Replante por bajo prendimiento",
          tipoActividad: "Año 2",
          faselunar: element.nombreFaseLunar,
          descripcion: "Si el porcentaje de prendimiento de la plantación fue bajo, sea por condiciones del suelo y las sequías por efectos de cambio climático, se programa en el año dos, la actividad forestal del replante. La misma debe realizarse en los meses de; mayo, junio, julio, agosto y septiembre, época de lluvia, correspondiente al ciclo femenino y cambio del Sol de equinoccio a solsticio. ",
          fechaoptima: fechaFormato,
          nombreEpoca: element.nombreEpoca,
          nombreTiempo: element.nombreTiempo,
          nombreCicloArbol: element.nombreCicloArbol,
          nombreCambio: element.nombreCambio,
          nombreCuatrimestre: element.nombreCuatrimestre
        });
      }

      if (element.act12 == 1) {
        events.push({
          title: "Construcción y mantenimiento de rondas corta fuego",
          startTime: fechaEvento,
          endTime: fechaEvento,
          allDay: true,
          actividad: "Construcción y mantenimiento de rondas corta fuego",
          tipoActividad: "Otras Actividades de Ciclo y Cuidados culturales",
          faselunar: element.nombreFaseLunar,
          descripcion: "Si el porcentaje de prendimiento de la plantación fue bajo, sea por condiciones del suelo y las sequías por efectos de cambio climático, se programa en el año dos, la actividad forestal del replante. La misma debe realizarse en los meses de; mayo, junio, julio, agosto y septiembre, época de lluvia, correspondiente al ciclo femenino y cambio del Sol de equinoccio a solsticio. ",
          fechaoptima: fechaFormato,
          nombreEpoca: element.nombreEpoca,
          nombreTiempo: element.nombreTiempo,
          nombreCicloArbol: element.nombreCicloArbol,
          nombreCambio: element.nombreCambio,
          nombreCuatrimestre: element.nombreCuatrimestre
        });
      }

      if (element.act13 == 1) {
        events.push({
          title: "Manejo de plagas",
          startTime: fechaEvento,
          endTime: fechaEvento,
          allDay: true,
          actividad: "Manejo de plagas",
          tipoActividad: "Otras Actividades de Ciclo y Cuidados culturales",
          faselunar: element.nombreFaseLunar,
          descripcion: "El manejo de plagas y principalmente en su fase de desarrollo de huevo y larva, es una actividad forestal que se debe observar y practicar durante todo el año y principalmente en luna nueva, el gusano está en su fase de huevo y larva, tiempo ideal para eliminarla, ya que al alcanzar la etapa de madurez, combinado con la luna de cuarto creciente y luna llena, la plaga encontrará los mejores nutrientes en la planta o árbol para su desarrollo y consecuentemente dificultará su control. ",
          fechaoptima: fechaFormato,
          nombreEpoca: element.nombreEpoca,
          nombreTiempo: element.nombreTiempo,
          nombreCicloArbol: element.nombreCicloArbol,
          nombreCambio: element.nombreCambio,
          nombreCuatrimestre: element.nombreCuatrimestre
        });
      }

      if (element.act16 == 1) {
        events.push({
          title: "Injertos en árboles frutales",
          startTime: fechaEvento,
          endTime: fechaEvento,
          allDay: true,
          actividad: "Injertos en árboles frutales",
          tipoActividad: "Otras Actividades de Ciclo y Cuidados culturales",
          faselunar: element.nombreFaseLunar,
          descripcion: "Los injertos (para uso en Sistemas Agroforestales, SAF) deben ser practicados en los meses de enero, febrero, marzo, noviembre y diciembre, época de viento y frío, en el ciclo masculino del árbol. La actividad se practica después de la cosecha de los frutos y antes que aparezcan las hojas o flores.",
          fechaoptima: fechaFormato,
          nombreEpoca: element.nombreEpoca,
          nombreTiempo: element.nombreTiempo,
          nombreCicloArbol: element.nombreCicloArbol,
          nombreCambio: element.nombreCambio,
          nombreCuatrimestre: element.nombreCuatrimestre
        });
      }

      if (element.act18 == 1) {
        events.push({
          title: "Podas de formación",
          startTime: fechaEvento,
          endTime: fechaEvento,
          allDay: true,
          actividad: "Podas de formación",
          tipoActividad: "Actividades Silviculturales",
          faselunar: element.nombreFaseLunar,
          descripcion: "Las podas de formación es una actividad en árboles maderables para obtener madera libre de nudos, dicha acción se realiza durante todo el año cuando el árbol se encuentra en su fase de crecimiento y desarrollo. Aunque, se debe tener cuidado de no realizar dicha actividad cuando el árbol esta en el ciclo femenino, floreando y madurando sus frutos. El efecto de luna para realizar los trabajos de dicha actividad, se recomienda en luna nueva y cuarto creciente",
          fechaoptima: fechaFormato,
          nombreEpoca: element.nombreEpoca,
          nombreTiempo: element.nombreTiempo,
          nombreCicloArbol: element.nombreCicloArbol,
          nombreCambio: element.nombreCambio,
          nombreCuatrimestre: element.nombreCuatrimestre
        });
      }

      if (element.act19 == 1) {
        events.push({
          title: "Podas de estímulo",
          startTime: fechaEvento,
          endTime: fechaEvento,
          allDay: true,
          actividad: "Podas de estímulo",
          tipoActividad: "Actividades Silviculturales",
          faselunar: element.nombreFaseLunar,
          descripcion: "Las podas de estímulo es una actividad forestal para mejorar la calidad de la madera y puede realizarse durante todo el año y principalmente cuando el árbol se encuentra en su fase de crecimiento y desarrollo. El efecto de luna para dicha actividad, se recomienda realizarla en cuarto creciente y luna llena",
          fechaoptima: fechaFormato,
          nombreEpoca: element.nombreEpoca,
          nombreTiempo: element.nombreTiempo,
          nombreCicloArbol: element.nombreCicloArbol,
          nombreCambio: element.nombreCambio,
          nombreCuatrimestre: element.nombreCuatrimestre
        });
      }

      //console.log(events);
    })


    this.eventSource = events;
  }

  //MODAL PARA EVENTOS
  async openCalModal(evento) {
    const modal = await this.modalCtrl.create({
      component: CalModalPage,
      cssClass: 'cal-modal',
      backdropDismiss: false,
      componentProps: {
        'actividad': evento.actividad,
        'tipoActividad': evento.tipoActividad,
        'descripcion': evento.descripcion,
        'fechaoptima': evento.fechaoptima,
        'nombreFaseLunar': evento.faselunar,
        'nombreEpoca': evento.nombreEpoca,
        'nombreTiempo': evento.nombreTiempo,
        'nombreCicloArbol': evento.nombreCicloArbol,
        'nombreCambio': evento.nombreCambio,
        'nombreCuatrimestre': evento.nombreCuatrimestre,
      }
    });

    await modal.present();

    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.event) {
        let event = result.data.event;
        if (event.allDay) {
          let start = event.startTime;
          event.startTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate()
            )
          );
          event.endTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate() + 1
            )
          );
        }
        this.eventSource.push(result.data.event);
        this.myCal.loadEvents();
      }
    });
  }

  createRandomEvents() {
    var events = [];
    for (var i = 0; i < 50; i += 1) {
      var date = new Date();
      var eventType = Math.floor(Math.random() * 2);
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = Math.floor(Math.random() * 2) + startDay;
      var startTime;
      var endTime;
      if (eventType === 0) {
        startTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + startDay
          )
        );
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + endDay
          )
        );
        events.push({
          title: 'All Day - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: true,
          actividad: "Manejo de plagas",
          tipoActividad: "Otras Actividades de Ciclo y Cuidados culturales",
          faselunar: "Luna Nueva",
          descripcion: "El manejo de plagas y principalmente en su fase de desarrollo de huevo y larva, es una actividad forestal que se debe observar y practicar durante todo el año y principalmente en luna nueva, el gusano está en su fase de huevo y larva, tiempo ideal para eliminarla, ya que al alcanzar la etapa de madurez, combinado con la luna de cuarto creciente y luna llena, la plaga encontrará los mejores nutrientes en la planta o árbol para su desarrollo y consecuentemente dificultará su control. ",
          fechainicio: "31/12/2021",
          fechaoptima: "02/01/2022",
          fechafin: "04/01/2022",
          nombreEpoca: "Frío",
          nombreTiempo: "Sequía",
          nombreCicloArbol: "2do Ciclo Masculino del Árbol",
          nombreCambio: "Solsticio",
          nombreCuatrimestre: "Primer cuatrimestre"
        });
      } else {
        var startMinute = Math.floor(Math.random() * 24 * 60);
        var endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + startDay,
          0,
          date.getMinutes() + startMinute
        );
        endTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + endDay,
          0,
          date.getMinutes() + endMinute
        );
        events.push({
          title: 'Event - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: false,
          actividad: "Manejo de plagas",
          tipoActividad: "Otras Actividades de Ciclo y Cuidados culturales",
          faselunar: "Luna Nueva",
          descripcion: "El manejo de plagas y principalmente en su fase de desarrollo de huevo y larva, es una actividad forestal que se debe observar y practicar durante todo el año y principalmente en luna nueva, el gusano está en su fase de huevo y larva, tiempo ideal para eliminarla, ya que al alcanzar la etapa de madurez, combinado con la luna de cuarto creciente y luna llena, la plaga encontrará los mejores nutrientes en la planta o árbol para su desarrollo y consecuentemente dificultará su control. ",
          fechainicio: "31/12/2021",
          fechaoptima: "02/01/2022",
          fechafin: "04/01/2022",
          nombreEpoca: "Frío",
          nombreTiempo: "Sequía",
          nombreCicloArbol: "2do Ciclo Masculino del Árbol",
          nombreCambio: "Solsticio",
          nombreCuatrimestre: "Primer cuatrimestre"
        });
      }
    }
    this.eventSource = events;
  }

}
