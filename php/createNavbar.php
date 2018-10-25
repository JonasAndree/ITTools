<?php
    $maxLevel = 0;
    $rootPage = null;
    $currentUser;
    $newId = $_REQUEST["id"];
    $newParentId = $_REQUEST["parent"];
    $newHeading = $_REQUEST["heading"];
    
    print_r("_____" . $newId . " , " . $newParentId . "  , " . $newHeading . "  :::: ");
    
    $conn = new mysqli("localhost", "root", "", "it_tools");
    
    
    uppdateView((int) $newId, (int) $newParentId);
    
    if ($conn->connect_error) {
        die("<div class='failed'>Connection failed: " . $conn->connect_error . "</div><br>");
    }
    
    class Page {
        public $parent = "null";
        public $heading = "root";
        public $id = 0;
        public $children = array();
    }
    
    function getPages($parent) {
        $parentId = $parent->id;
        $children = $GLOBALS['conn']->query("SELECT * FROM `pages` WHERE parent='$parentId'");
        while ($child = $children->fetch_assoc()) {
            $newPage = new Page();
            $newPage->parent = $parentId;
            $newPage->heading = $child["heading"];
            $newPage->id = $child["id"];
            array_push($parent->children, $newPage);
            getPages($newPage);
        }
    }
    
    function getPage($tempRootPage, $id, $parentId, $tempLevel) {
        if ($tempRootPage->id == $id && $tempRootPage->parent == $parentId) {
            return array($tempRootPage, $tempLevel);
        } else {
            foreach ($tempRootPage->children as $child) {
                print_r($child);
                return getPage($child, $id, $parentId, $tempLevel++);
            }
        }
    }
    
    function uppdateView($id, $parentId) {
        $rootPage = new Page();
        getPages($rootPage);
        print_r("id: " . $id . ", parentId: " . $parentId . ": : : : : : : : :");
        $parentPage = getPage($rootPage, $id, $parentId, 0);
        populatePage($parentPage[0], $parentPage[1]);
    }
    
    function populatePage($parentPage, $level) {
        print_r($parentPage->id);
        $parentId = $parentPage->id;
        
        global $maxLevel;
        if ($maxLevel < $level)
            $maxLevel = $level;
 
        echo "<section id='sub-nav-conainer-$level-$parentId' class='sub-nav-container'>";
            echo "<div id='sub-nav-content-$level-$parentId' class='sub-nav-content'  
                   style='left: calc(" . ($level * 10) . "vw  + " . (10 * $level) . "px )'>";
                if ($parentPage->heading == "root") {
                    echo "<div id='page-logo' class='nav-item'><h1>IT Tools</h1></div>";
                } else {
                    echo "<li class='nav-item nav-paranet'>
                                $parentPage->heading
                            </li>";
                }
                echo "<ul>";   
                    foreach ($parentPage->children as $child) {
                        $nextLevel = $level + 1;
                        $childHeading = $child->heading;
                        $parentId = $child->id;
                        $numberOfChildren = count($child->children);
                        echo "<li id='nav-item-$parentId' class='nav-item one-line-nav-item' 
                                onmouseover='navElementMouseOver(this, \"sub-nav-conainer-$nextLevel-$parentId\", \"sub-nav-content-$nextLevel-$parentId \", \"$nextLevel\")' 
                                heading='$child->heading' 
                                parentId='$child->parent' 
                                childId='$child->id' 
                                nrChildren='$numberOfChildren'
                                onclick='navElementClicked(this)'>";
                            if ($numberOfChildren != 0) {
                                echo "<div>";
                                echo "<div class='nav-button-parent'> 
                                $child->heading $child->parent</div>";
                            echo "<span class='arrow'><span></span></span>";
                                echo "</div>";
                            } else {
                                echo "<div class='nav-button-parent-not'> 
                                    $child->heading $child->parent
                                </div>";
                            }
                        echo "</li>";
                        if ($numberOfChildren > 0)
                            populatePage($child, $nextLevel);
                    }
                echo "</ul>";
            echo "</div>";
        echo "</section>";
    }
    
    /* to optimice we are getting al the pages at once and greate the page */
    
    
    
    //print_r($rootPage);
    //populatePage($rootPage, 0);
?>