import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {
  qId: any;
  qTitle: any;
  questions = [
    {
      content: "what is java programming.?",
      option1: "sdsfsf",
      option2: "dsfsfsf",
      option3: "sdsfsf",
      option4: "dsfsfsf",
      answer: "dhfkfjs",
      quesId: 234,
    }
  ];

  constructor(

    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _snak: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;
    this.qTitle = this._route.snapshot.params.title;
    this._question.getQuestionsOfQuiz(this.qId).subscribe((data: any) => {
      console.log(data);
      this.questions = data;
    }, (error) => {
      console.log(error);
    });
    //console.log(this.qId);
    //console.log(this.qTitle);
  }

  // delete questions
  deleteQuestion(qid: any) {
    //alert(qid);
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure that you want to delete this question?',
    }).then((result) => {
      // alert('testing');
      if (result.isConfirmed) {
        // confirm
        this._question.deleteQuestion(qid).subscribe(
          (data) => {
            this._snak.open('Question Deleted ', '', {
              duration: 3000,
            });
            this.questions = this.questions.filter((q) => q.quesId != qid);
          },

          (error) => {
            this._snak.open('Error in deleting questions', '', {
              duration: 3000,
            });
            console.log(error);
          }
        );
      }
    });
  }
}
