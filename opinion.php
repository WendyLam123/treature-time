<!DOCTYPE html>
<html>
	<head>    
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width">
		<meta name="author" content="">
		<title>Survey</title>
		<link href="web.css" rel="stylesheet" type="text/css" />
		<script src="https://kit.fontawesome.com/44ae50a47e.js" crossorigin="anonymous"></script>
		<script src="web.js"></script>
	</head>

<body>

  <div class="homeHeader">
    <a href="https://drexel.edu" target="_blank">
      <img src="/Images/logo.png" alt="Drexel Logo" class="logo">
    </a>
    <nav class="navigation">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="dining.html">Dining</a></li>
        <li><a href="housing.html">Housing</a></li>
        <li><a href="calculator.html">Calculator</a></li>
      </ul>
    </nav>
  </div>
  <div class="main-layout-opinion_page">
    <h1>Drexel Housing / Dining Survey</h1>

    <form action ="opinion.php" method="post">

      <div class="container">
        <p><strong>Which area are you evaluating?</strong></p>
        <label for="area">Choose an area:</label>
        <select name="area" id="area">
          <option value="">Select</option>
          <option value="housing">Housing</option>
          <option value="dining">Dining</option>
          <option value="both">Both</option>
          <option value="other">Other</option>
        </select>
      </div>
      <br>

      <div class="container">
        <p><strong>Rate each item on a scale of 1 to 5:</strong></p>
        <p>5 = Excellent</p> 
        <p>3 = Neutral</p>
        <p>1 = Very poor</p>
      </div>
      <br><br>

      <div class="container">
      <label for="satification">Overall, how satisfied are you with your experience?</label>
        <p>(1 - Very dissatisfied &#8594; 5 - Very satisfied)</p>
        <select name="satification" id="satification">
          <option value="">Select 1-5</option>
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
      </div>
      <br>

      <div class="container">
      <label for="satification_feedback">Do you have any other feedback about your experience?</label>
      <br><br>
      <textarea name="satification_feedback" id="satification_feedback" placeholder="Type your feedback here..." style="width: 90%; height:100px"></textarea>
      </div>
      <br><br>

      <div class="container">
      <label for="value">How would you rate the value for money (cost vs quality)?</label>
        <p>(1 - Very poor &#8594; 5 - Excellent)</p>
        <select name="value" id="value">
          <option value="">Select 1-5</option>
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
      </div>
      <br>

      <div class="container">
      <label for="value_feedback">Do you have any other feedback about your experience?</label>
      <br><br>
      <textarea name="value_feedback" id="value_feedback" placeholder="Type your feedback here..." style="width: 90%; height:100px"></textarea>
      </div>
      <br><br>

      <div class="container">
      <label for="convenient">How convenient was this experience</label>
        <p>(1 - Very inconvenient &#8594; 5 - Very convenient)</p>
        <select name="convenient" id="convenient">
          <option value="">Select 1-5</option>
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
      </div>
      <br>

      <div class="container">
      <label for="convenient_feedback">Do you have any other feedback about your experience?</label>
      <br>
      <textarea name="convenient_feedback" id="convenient_feedback" placeholder="Type your feedback here..." style="width: 90%; height:100px"></textarea>
      </div>
      <br><br>

      <div class="container">
      <label for="web_rank">How was your experience using this website?</label>
        <p>(1 - Not satisified &#8594; 5 - Very satisified)</p>
        <select name="web_rank" id="web_rank">
          <option value="">Select 1-5</option>
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
      </div>
      <br>
      
      <div class="container">
      <label for="web_feedback">Do you have any other feedback for the website?</label>
      <br><br>
      <textarea name="web_feedback" id="web_feedback" placeholder="Type your feedback here..." style="width: 90%; height:100px;"></textarea>
      </div>
      <br><br>

      <div class="button_container">
        <button name="submit" type="submit" class="submit_button">Submit</button>
      </div>
      <br><br>
    </form>

  </div>
  

  <div class="result">

    </div>
    <script src = "opinion.js"></script>
</body>
</html>
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $area = "Area: " . $_POST['area'] . "\n";
  $satification = "Satisfaction: " . $_POST['satification'] . "\n";
  $satification_feedback = "Satisfaction Feedback: " . $_POST['satification_feedback'] . "\n";

  $value = "Value: " . $_POST['value'] . "\n";
  $value_feedback = "Value Feedback: " . $_POST['value_feedback'] . "\n";

  $convenient = "Convenience: " . $_POST['convenient'] . "\n";
  $convenient_feedback = "Convenience Feedback: " . $_POST['convenient_feedback'] . "\n";

  $web_rank = "Web Rank: " . $_POST['web_rank'] . "\n";
  $web_feedback = "Web Feedback: " . $_POST['web_feedback'] . "\n";

  $data =
    $area .
    $satification .
    $satification_feedback .
    $value .
    $value_feedback .
    $convenient .
    $convenient_feedback .
    $web_rank .
    $web_feedback .
    "---------------------------\n";

  $file = fopen("feedback_form.txt", "a");
  fwrite($file, $data);
  fclose($file);
}
?>