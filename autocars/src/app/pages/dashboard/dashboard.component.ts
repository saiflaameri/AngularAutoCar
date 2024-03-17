import { Component, OnInit } from '@angular/core';
import { BondecarburationService } from 'src/app/service/bondecarburation.service';
import { VehiculeService } from 'src/app/service/vehicule.service';
import { HttpClient } from '@angular/common/http';
import { Chart,registerables } from 'chart.js';
Chart.register(...registerables);




import * as annyang from 'annyang';
import { ChatbotService } from 'src/app/service/chatbotservice.service';
import { timeout } from 'rxjs/internal/operators/timeout';
import { WeatherService } from 'src/app/service/weather.service';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { RapportvoitureService } from 'src/app/service/rapportvoiture.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  [x: string]: any;
  chartdata:any;
  labeldata:any[]=[];
  realdata:any[]=[];
  colordata:any[]=[];
  count:number;
  nbvh: number;
  country: string = '';
  weatherData: any;
  private map: any;

  city: string = '';
  vehicleCount: number;

  messages: { text: string; user: string }[] = [];
  userInput: string;
  isProcessing: any;
  constructor(private rapportvoitureService:RapportvoitureService,private weatherService: WeatherService, private chatbotService:ChatbotService,private bondecarburationService:BondecarburationService,private vehiculeService:VehiculeService,private HttpClient:HttpClient){}
  
    ngOnInit(): void {
  const map = L.map('map').setView([51.505, -0.09], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Add the routing control
  const control = L.Routing.control({
    waypoints: [
      L.latLng(35.7211, 9.47104), // Starting point
      L.latLng(35.7324, 9.4774), // Destination point
    ],
    routeWhileDragging: true,
    router: L.Routing.osrmv1({
      serviceUrl: 'https://router.project-osrm.org/route/v1'
    })
  }).addTo(map);

  // Add a marker to select a position
  let marker;
  marker = L.marker([0, 0], {
    icon: L.divIcon({
      className: 'bg-primary',
      html: '<i class="bi bi-geo-alt-fill"></i>',
      iconSize: [40, 40]
    })
  }).addTo(map);

  map.on('click', (e) => {
    const { lat, lng } = e.latlng;
    marker.setLatLng([lat, lng]);
  });

      this.vehiculeService.countevent().subscribe(nbvh => {
        this.nbvh = nbvh;
        this.vehicleCount = nbvh;
        console.log('Vehicle Count:', this.vehicleCount);
      });
      this.vehiculeService.getallvehicule().subscribe((data: any[]) => {
        const vehicleData = data;
        const brandCounts = this.countVehiclesByBrand(vehicleData);
    
        const brands = Object.keys(brandCounts);
        const counts = Object.values(brandCounts);
    
        // Appel de la fonction pour générer et afficher le graphique
        this.renderrChart(brands, counts as number[]);
      });
   
this.rapportvoitureService.getallrapportvoiture().subscribe(result => {
  this.chartdata = result;
  if (this.chartdata != null) {
    const totalKilometersByMonth = {}; // Objet pour stocker les kilomètres totaux par mois
    for (let i = 0; i < this.chartdata.length; i++) {
      const ksortie = this.chartdata[i].ksortie;
      const karrive = this.chartdata[i].karrive;
      const date = new Date(this.chartdata[i].date);

      const month = `${date.getFullYear()}-${date.getMonth() + 1}`; // Utiliser le format "année-mois" comme clé

      const kilometers = karrive - ksortie; // Calculer les kilomètres parcourus

      if (totalKilometersByMonth[month]) {
        totalKilometersByMonth[month] += kilometers; // Ajouter les kilomètres à la valeur existante
      } else {
        totalKilometersByMonth[month] = kilometers; // Créer une nouvelle entrée pour le mois
      }
    }

    const labeldata = [];
    const realdata = [];

    // Remplir les données pour le graphique
    for (const month in totalKilometersByMonth) {
      labeldata.push(month);
      realdata.push(totalKilometersByMonth[month]);
    }

    this.renderChart(labeldata, realdata);
  }
});

      this.bondecarburationService.getallbondecarburation().subscribe(result => {
        this.chartdata = result;
        if (this.chartdata != null) {
          const totalCosts = {}; // Objet pour stocker les coûts totaux par station
          for (let i = 0; i < this.chartdata.length; i++) {
            const station = this.chartdata[i].station;
            const cost = this.chartdata[i].cout;
            if (station in totalCosts) {
              totalCosts[station] += cost;
            } else {
              totalCosts[station] = cost;
            }
          }
      
          // Remplir les données pour le graphique
          for (const station in totalCosts) {
            this.labeldata.push(station);
            this.realdata.push(totalCosts[station]);
          }
        }
      
        this.renderchart(this.labeldata, this.realdata);
      });}
  
    renderchart(labeldata:any,realdata:any){
      const ctx = document.getElementById('myChart');
  
      new Chart('ctx', {
        type: 'bar',
        data: {
          labels: labeldata,
          datasets: [{
            label: 'Montant total par station',
            data: realdata,
            borderWidth: 1,
            backgroundColor: 'rgba(75, 192, 192, 0.8)',
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Carburation statistique',
              font: {
                size: 10,
                weight: 'bold'
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Station',
                font: {
                  size: 8
                }
              }
            },
            y: {
              title: {
                display: true,
                text: 'Coût',
                font: {
                  size: 8
                }
              },
              beginAtZero: true
            }
          }
        }
      });
      
  
    }
    renderChart(labels: any[], data: any[]) {
      const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Kilométrage total par mois',
            data: data,
            borderWidth: 1,
            borderColor:'rgb(75, 192, 192)',
            backgroundColor: '#FFB1C1',
            
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Kilométrage total par mois',
              font: {
                size: 18,
                weight: 'bold'
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Mois'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Kilométrage total'
              },
              beginAtZero: true
            }
          }
        }
      });
    }
    async sendMessage() {
      if (this.isProcessing) {
        return;
      }
    
      this.messages.push({ text: this.userInput, user: 'chatbot' });
    
      try {
        this.isProcessing = true;
    
        const response = await this.chatbotService.getChatbotResponse(this.userInput);
        this.messages.push({ text: response, user: 'chatbot' });
      } catch (error) {
        console.error('Erreur de limitation de taux :', error);
        this.messages.push({ text: 'Désolé, une erreur s\'est produite. Veuillez réessayer plus tard.', user: 'chatbot' });
      } finally {
        this.isProcessing = false;
      }
    
      this.userInput = '';
    
    }
    calculateTotalCost(data: any): number {
      let totalCost = 0;
      // Calculate the total cost based on the individual costs
      // Assuming the individual costs are stored in the 'cost' property of the data object
      for (let i = 0; i < data.cost.length; i++) {
        totalCost += data.cost[i];
      }
      return totalCost;
    }
    getWeatherData() {
      this.weatherService.getWeather(this.city, this.country).subscribe(response => {
        this.weatherData = response;
        this.weatherData.main.temp = this.convertKelvinToCelsius(this.weatherData.main.temp);
      });
    }
  
    convertKelvinToCelsius(kelvin: number): number {
      return kelvin - 273.15;
    }

    fetchVehicleCount(): void {
      this.vehiculeService.countevent().subscribe(count => {
        this.vehicleCount = count;
        console.log('Vehicle Count:', this.vehicleCount);
      });
    }
      
    displayVehicleCountByBrand() {
    
    }

    countVehiclesByBrand(vehicule: any[]): any {
      const brandCounts: any = {};
    
      for (let i = 0; i < vehicule.length; i++) {
        const brand = vehicule[i].marque;
    
        if (brandCounts[brand]) {
          brandCounts[brand]++;
        } else {
          brandCounts[brand] = 1;
        }
      }
    
      return brandCounts;
    }

  
    
    renderrChart(brands: string[], counts: number[]) {
      const ctx1 = document.getElementById('chart1') as HTMLCanvasElement;
      const chart = new Chart(ctx1, {
        type: 'pie',
        data: {
          labels: brands,
          datasets: [{
            label: 'Nombre de véhicules',
            data: counts,
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Nombre de véhicules'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Marque'
              }
            }
          }
        }
      });
    }
    
    
    }