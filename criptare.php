<?php

$code = filter_input(INPUT_POST, 'code', FILTER_SANITIZE_STRING);

?>

<?php if ($code) : ?>
    <p>You selected <?php echo $code ?></span></p>
    <p><a href="index.html">Back to the form</a></p>
<?php else : ?>
    <p>You did not select any code</p>
<?php endif ?>