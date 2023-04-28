export default class Language {
  constructor() {
    this.language = localStorage.getItem('currentLang') || 'EN';
  }

  change() {
    this.language === 'EN' ? this.language = 'RU' : this.language = 'EN';
    localStorage.setItem('currentLang', this.language);
    console.log(this.language)
  }
}