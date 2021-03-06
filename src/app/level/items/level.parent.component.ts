import { OnInit, Component } from '@angular/core';
import { Level } from '../service/level.model';
import { LevelService } from '../service/level.service';
import { SentencesService } from '../../shared/service/sentences.service';

// Parent component for level items. Items should implements this component
@Component({
  selector: '.level-current-item',
  template: '<div>parent</div>'
})
export class LevelParentComponent implements OnInit {
  level: Level;
  levels: Level[];
  length: number;
  sentences: string[];
  inputSentences: any[];
  inputTextArea: string = "";
  wordingSentences: string[] = [];
  workspaceSentences: string[] = [];
  wordMatrix: any[] = [];

  constructor(private dataService: LevelService,
              private sentencesService: SentencesService) { }

  ngOnInit() {
    this.level = this.dataService.getCurrentLevel();
    this.levels = this.dataService.getTitles();
    this.length = this.levels.length;
    this.sentences = this.sentencesService.getSentences();
    this.wordingSentences = this.shuffle(this.sentences);
    this.wordMatrix = this.sentences.map((item) => { return { source: this.shuffle(item.split(' ')), target: []}});
    this.inputSentences = this.sentences.map(() => { return { text: "" }});
  }

  addToList(item, index) {
    this.wordingSentences.splice(index, 1);
    this.workspaceSentences.push(item);
  }

  removeFromList(item, index) {
    this.workspaceSentences.splice(index, 1);
    this.wordingSentences.push(item);
  }

  addWord(sentence, word, index) {
    sentence.source.splice(index,1);
    sentence.target.push(word);
  }

  removeWord(sentence, word, index) {
    sentence.target.splice(index,1);
    sentence.source.push(word);
  }

  isEqual(a,b) {
    if (a.length !== b.length) return false;
    for(let i=0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  isEmptyTarget(a) {
    a.forEach((item) => { return item.target.length == 0 })
    return true;
  }

  shuffle(array) {
    let newArray = Object.assign([], array);
    let currentIndex = newArray.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = newArray[currentIndex];
      newArray[currentIndex] = newArray[randomIndex];
      newArray[randomIndex] = temporaryValue;
    }

    return newArray;
  }
}
