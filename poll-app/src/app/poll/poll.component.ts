import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PollService } from '../poll.service';
import { Poll } from '../poll.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { createFind } from 'rxjs/internal/operators/find';
@Component({
  selector: 'app-poll',
  imports: [CommonModule, FormsModule],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.css',
})
export class PollComponent implements OnInit {
  newPoll: Poll = {
    question: '',
      options: [
        { optionText: '', voteCount: 0 },
        { optionText: '', voteCount: 0 }
      ]
  }
  polls: Poll[] = [];
  constructor(private pollService: PollService, private cdr: ChangeDetectorRef ) {

  }

  ngOnInit(): void {
    this.loadPolls();
  }

  loadPolls(){
    this.pollService.getPolls().subscribe({
      next: (data) => {
        this.polls = data;
      },
      error: (error) => {
        console.error("Error fetching polls: ", error);
      }
    });
  }
  
  trackByIndex(index: number){
    return index;
  }
  createPoll(){
    console.log("Poll created")
    this.pollService.createPoll(this.newPoll).subscribe({
      next: (createdPoll) => {
        this.polls.push(createdPoll)
        this.resetPoll()
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error("Error creating poll: ", error);
      }
    });
    
  }

  resetPoll(){
    this.newPoll = {
      question: '',
      options: [
        { optionText: '', voteCount: 0 },
        { optionText: '', voteCount: 0 }
      ]
    } ;
  }

  vote(pollId: number, optionIndex: number){
    console.log("Voted on poll")
    this.pollService.vote(pollId, optionIndex).subscribe({
      next: () => {
        const poll = this.polls.find(p => p.id === pollId)
          if(poll){
            poll.options[optionIndex].voteCount++;
          }
          this.cdr.detectChanges();
        },
      error: (error) => {
        console.error("Error voting on a poll: ", error);
      }
    })
  }
  addOption(){
     this.newPoll.options.push({ optionText: '', voteCount: 0 });
  }


}
