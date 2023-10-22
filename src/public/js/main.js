$(document).ready(function() {
      $('.add').on('click', function() {
        var field = '<div class="col-md-5 mb-3"><label for="country">Film</label><select id="film" name="film" required="" class="custom-select d-block w-100"><option value="">Choose one</option><option value="pawPatrol">Paw patrol</option></select></div><div class="col-md-4 mb-3"><label for="ticketType">Ticket type</label><select id="ticketType" name="ticketType" required="" class="custom-select d-block w-100"><option value="">Choose one</option><option value="Infant">Infant - Free</option><option value="Child">Child - £10.00</option><option value="Adult">Adult - £20.00</option></select></div><div class="col-md-3 mb-3"><label for="amount">Amount</label><input id="amount" type="number" min="0" max="20" placeholder="0" value="" name="amount" required="" class="form-control"></div>';
        var elements = document.getElementsByClassName('row');
        $(elements[1]).append(field);
      })
    })