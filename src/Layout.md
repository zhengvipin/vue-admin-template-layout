# layout-container-vertical
``` html
<div id="app">
    <div class="app-wrapper [mobile,withoutAnimation,hideSidebar,openSidebar]">
        <div class="drawer-bg"></div>
        <div class="layout-container-vertical">
            <div class="sidebar-container [has-logo]"></div>	
            <div class="main-container [hasTagsView]">
                <div class="app-header [fixed-header]">
                    <div class="navbar"></div>
                    <div class="tags-view-container"></div>
                </div>
                <div class="app-main">
                    <div class="vab-ad"></div>
                    <div class="app-container"></div>
                </div>
            </div>
        </div>	
    </div>
</div>
```
# layout-container-horizontal
``` html
<div id="app">
    <div class="app-wrapper [mobile,withoutAnimation]">
        <div class="drawer-bg"></div>
        <div class="layout-container-horizontal">
            <div class="main-container [hasTagsView]">
                <div class="app-header [fixed-header]">
                    <div class="topbar-container"></div>
                    <div class="tags-view-container"></div>
                </div>
                <div class="app-main">
                    <div class="vab-ad"></div>
                    <div class="app-container"></div>
                </div>
            </div>
        </div>	
    </div>
</app>	
```

PS:  熟悉 layout 布局结构，后续业务页面编写时命名的 className 尽量不要与 layout 已有的冲突。