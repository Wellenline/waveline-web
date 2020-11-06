import { Component, OnInit, HostListener, ElementRef, Input, Output, EventEmitter, ViewChild } from "@angular/core";
@Component({
	selector: "app-slider",
	templateUrl: "./slider.component.html",
	styleUrls: ["./slider.component.scss"],
})
export class SliderComponent implements OnInit {
	@Input() value = 0;
	@Output() valueChange = new EventEmitter();

	@Input() options = {
		vertical: false,
	};

	@Input() public waveform: string;
	private isDragging = false;

	constructor(private elementRef: ElementRef) { }

	ngOnInit(): void {
	}

	public onMouseDown(e) {
		e.preventDefault();
		this.isDragging = true;

	}

	public onClick(e) {
		const position = this.getPosition(e);
		this.value = position.percentage;
		this.valueChange.next(position.position);
	}

	public onMouseMove(e) {
		if (!this.isDragging) {
			return;
		}

		const position = this.getPosition(e);
		this.value = position.percentage;
		this.valueChange.next(position.position);
	}

	public onMouseUp(e) {
		console.log("stopped moving");
		this.isDragging = false;
	}
	@HostListener("document:touchstart", ["$event"])
	@HostListener("document:mousedown", ["$event"])
	public onStopDragging(event): void {
		if (!this.elementRef.nativeElement.contains(event.target)) {
			this.isDragging = false;
		}
	}

	private getPosition(e) {

		const rect = e.currentTarget.getBoundingClientRect();
		const xCoordinate = e.type === "touchmove" ? e.touches[0].clientX - rect.left : e.pageX - rect.left;
		const yCoordinate = e.type === "touchmove" ? e.touches[0].clientY - rect.top : e.pageY - rect.top;

		const position = this.options.vertical ? yCoordinate / rect.height :
			xCoordinate / rect.width;

		return {
			position,
			percentage: this.options.vertical ? 100 - (position * 100) : position * 100,
		};
	}

}
