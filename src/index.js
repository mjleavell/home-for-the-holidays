import $ from 'jquery';
import 'bootstrap';
import './index.scss';

$('#click-btn').on('click', () => {
  $('#output').append('sup');
});
