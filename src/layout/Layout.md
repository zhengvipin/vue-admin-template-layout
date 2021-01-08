# Agree-layout-vertical

``` html
<div id="app">
    <div class="agree-layout agree-layout-vertical [mobile,withoutAnimation,hideSidebar,openSidebar]">
        <div class="drawer-bg"></div>
        <div class="agree-sidebar [has-logo]"></div>	
        <div class="agree-layout-container [hasTagsView]">
            <div class="agree-layout-header [fixed-header]">
                <div class="navbar"></div>
                <div class="tags-view-container"></div>
            </div>
            <div class="agree-layout-main">
                <div class="vab-ad"></div>
                <div class="agree-layout-main-container"></div>
            </div>
        </div>
    </div>
</div>
```

# Agree-layout-horizontal

``` html
<div id="app">
    <div class="agree-layout agree-layout-horizontal [mobile,withoutAnimation]">
        <div class="drawer-bg"></div>
		<div class="agree-layout-container [hasTagsView]">
            <div class="agree-layout-header [fixed-header]">
                <div class="topbar-container"></div>
                <div class="tags-view-container"></div>
            </div>
            <div class="agree-layout-main">
                <div class="vab-ad"></div>
                <div class="agree-layout-main-container"></div>
            </div>
        </div>
    </div>
</app>	
```

PS:  熟悉 layout 布局结构，后续业务页面编写时命名的 className 尽量不要与 layout 已有的冲突。