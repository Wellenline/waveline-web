import { Component, HostListener } from "@angular/core";
import { PlayerService } from "./services/player.service";
import { ThemeService } from "./services/theme.service";
import { UpdateService } from "./services/update.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {
	constructor(private themeService: ThemeService, private updateService: UpdateService) { }
	ngOnInit() {


	}
}
