import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'daf8600a3a5336fb83f354807e320f84';

  constructor(private http: HttpClient) {}

  getWeather(city: string, country: string) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${this.apiKey}`;
    return this.http.get(url);
  }
}
